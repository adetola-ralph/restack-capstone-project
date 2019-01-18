import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app, { db } from '../';
import { CategoryItemController } from '../controllers';
import CategoryItemModel from '../model/Category';

const { expect } = chai;
const api = supertest.agent(app);
let testCategoryItem;
let token;
let testRegisteredUser

let registereduser;
const validUser = {
  email: 'admin@oreofe.me',
  password: 'password',
};

const nonExistentUser = {
  email: 'non@oreofe.me',
  password: 'password',
}

describe('Integration Tests', () => {
  describe('Category Item', () => {
    before(async () => {
      await new CategoryItemModel({
        title: 'Installing Git',
      }).save();
    });

    before(async () => {
      const res = await api.post('/api/auth/register')
        .send({
          email: 'admin@test.site',
          password: 'password',
          firstname: 'Test',
          lastname: 'User',
        });

      token = res.body.token;
      testRegisteredUser = res.body.user;
    });

    it('should return a list of Category items with an array of instructions', async () => {
      const res = await api.get('/api/categoryItems').expect(200);

      expect(res.body).to.not.be.empty;
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1);
    });

    it('should create new category Items without instructions', async () => {
      const res = await api.post('/api/categoryItems')
        .set('x-access-token', token)
        .send({ title: 'Checkout branches' })
        .expect(201);

      expect(res.body).to.haveOwnProperty('title', 'Checkout branches');

      const res2 = await api.get('/api/categoryItems').expect(200);
      expect(res2.body).to.deep.include(res.body);
    });

    it('should (creation) fail if the sent an empty object', async () => {
      const res = await api.post('/api/categoryItems')
        .set('x-access-token', token)
        .send({})
        .expect(422);

      expect(res.body.message).to.eql('Title is missing');
    });

    it('should create new category Items with instructions', async () => {
      const res = await api.post('/api/categoryItems')
        .set('x-access-token', token)
        .send({
          title: 'Checkout to the last branch',
          instructions: [{
            title: 'Checkout to the last branch',
            command: 'git checkout -',
          }],
        })
        .expect(201);

      expect(res.body).to.haveOwnProperty('title', 'Checkout to the last branch');
      expect(res.body.instructions).to.be.an('array');

      const res2 = await api.get(`/api/categoryItems/${res.body._id}`);
      testCategoryItem = res2.body;
      expect(testCategoryItem).to.haveOwnProperty('instructions');
      const { instructions } = testCategoryItem;
      expect(instructions[0]).to.haveOwnProperty('title', 'Checkout to the last branch');
      expect(instructions[0]).to.haveOwnProperty('command', 'git checkout -');
    });

    it('should (creation) fail if sent invalid instructions format', async () => {
      const res = await api.post('/api/categoryItems')
        .set('x-access-token', token)
        .send({
          title: 'Checkout to the last branch',
          instructions: [{
            title: 'Checkout to the last branch',
            command: '',
          }],
        })
        .expect(422);

      expect(res.body.message).to.eql('Wrong format for instructions');
    });

    it('return a categoryItem if requested', async () => {
      const res = await api.get(`/api/categoryItems/${testCategoryItem._id}`).expect(200);

      expect(res.body).to.deep.eql(testCategoryItem);
    });

    it('return 404 for non existent category item', async () => {
      const objectId = new mongoose.Types.ObjectId;
      const res = await api.get(`/api/categoryItems/${objectId}`).expect(404);

      expect(res.body.message).to.eql('Category item not found');
    });

    it('should be able to update existing category item', async ()=> {
      const res = await api.patch(`/api/categoryItems/${testCategoryItem._id}`)
        .set('x-access-token', token)
        .send({
          title: 'Something else',
        })
        .expect(200);

      expect(res.body).to.eql({ ...testCategoryItem, title: 'Something else' });
    });

    it('should throw an error if category is non existing (update)', async ()=> {
      const objectId = new mongoose.Types.ObjectId;
      const res = await api.patch(`/api/categoryItems/${objectId}`)
        .set('x-access-token', token)
        .send({
          title: 'Something else',
        })
        .expect(404);
    });

    it('should be able to delete a category item', async () => {
      const res = await api.delete(`/api/categoryItems/${testCategoryItem._id}`)
        .set('x-access-token', token)
        .expect(200);

      expect(res.body).to.haveOwnProperty('message', 'Item deleted');
    });

    it('should throw an error if category is non existing (delete)', async () => {
      const res = await api.delete(`/api/categoryItems/${testCategoryItem._id}`)
        .set('x-access-token', token)
        .expect(404);
    });
  });

  describe('Auth', () => {
    describe('register', () => {
      it('should error if any field is missing', async () => {
        const result = await api.post('/api/auth/register')
          .send({})
          .expect(422);

        const payload = JSON.parse(result.body.message);
        expect(payload).to.haveOwnProperty('message', 'Missing field');
        expect(payload).to.haveOwnProperty('fields');
        expect(payload.fields).to.deep.include('firstname');
        expect(payload.fields).to.deep.include('lastname');
        expect(payload.fields).to.deep.include('email');
        expect(payload.fields).to.deep.include('password');
      });

      it('should register a user and send a jwt token', async () => {
        const result = await api.post('/api/auth/register')
          .send({ ...validUser, firstname: 'Oreofe', lastname: 'Olutola'})
          .expect(200);

        registereduser = result.body;
        expect(registereduser).to.haveOwnProperty('user');
        expect(registereduser.user).to.not.haveOwnProperty('password');
        expect(registereduser).to.haveOwnProperty('token');
      });

      it('should return 409 for an existing email', async () => {
        const result = await api.post('/api/auth/register')
          .send({ ...validUser, firstname: 'Ife', lastname: 'Olutola'})
          .expect(409);

        const { message } = result.body;
        expect(message).to.eql('User with email already exists');
      });
    });

    describe('login', () => {
      it('should return 404 for no existing user', async () => {
        const result = await api.post('/api/auth/login')
          .send(nonExistentUser)
          .expect(404);

        expect(result.body.message).to.eql('User not found');
      });

      it('should return 401 for wrong password', async () => {
        const result = await api.post('/api/auth/login')
          .send({ ...validUser, password: 'wrongpassword' })
          .expect(401);

        expect(result.body.message).to.eql('Wrong password');
      });

      it('should return 400 for missing fields', async () => {
        const result = await api.post('/api/auth/login')
          .send({})
          .expect(422);

        expect(result.body.message).to.eql('Missing fields');
      });

      it('should successfully login a user', async () => {
        const result = await api.post('/api/auth/login')
          .send(validUser)
          .expect(200);

        expect(result.body).to.haveOwnProperty('user');
        expect(result.body.user).to.not.haveOwnProperty('password');
        expect(result.body.user).to.not.haveOwnProperty('fullname');
        expect(result.body).to.haveOwnProperty('token');
      });
    });
  });

  describe('error handling', () => {
    before(() => {
      const stub = sinon.stub(CategoryItemController, 'getAll')
      stub.throws('This is an error');
    });

    it('should return 500 on event of an error', async () => {
      const res = await api.get('/api/categoryItems').expect(500);
    });

    after(() => {
      sinon.resetBehavior();
    });
  });

  after(() => {
    db.dropDatabase();
    db.close();
  });
});
