import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app, { db } from '../';
import { CategoryItemController, InstructionController } from '../controllers';
import CategoryItemModel from '../model/Category';

const { expect } = chai;
const api = supertest.agent(app);
let testCategoryItem;

describe('Integration Tests', () => {
  describe('Category Item', () => {
    before(async () => {
      await new CategoryItemModel({
        title: 'Installing Git',
      }).save();
    });

    it('should return a list of Category items with an array of instructions', async () => {
      const res = await api.get('/api/categoryItems').expect(200);

      expect(res.body).to.not.be.empty;
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1);
      // expect(res.body[0].instructions).to.be.an('array');
    });

    it('should create new category Items without instructions', async () => {
      const res = await api.post('/api/categoryItems')
        .send({ title: 'Checkout branches' })
        .expect(201);

      expect(res.body).to.haveOwnProperty('title', 'Checkout branches');

      const res2 = await api.get('/api/categoryItems').expect(200);
      expect(res2.body).to.deep.include(res.body);
    });

    it('should (creation) fail if the sent an empty object', async () => {
      const res = await api.post('/api/categoryItems')
        .send({})
        .expect(422);

      expect(res.body.message).to.eql('Title is missing');
    });

    it('should create new category Items with instructions', async () => {
      const res = await api.post('/api/categoryItems')
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
        .send({
          title: 'Something else',
        })
        .expect(200);

      expect(res.body).to.eql({ ...testCategoryItem, title: 'Something else' });
    });

    it('should throw an error if category is non existing (update)', async ()=> {
      const objectId = new mongoose.Types.ObjectId;
      const res = await api.patch(`/api/categoryItems/${objectId}`)
        .send({
          title: 'Something else',
        })
        .expect(404);
    });

    it('should be able to delete a category item', async () => {
      const res = await api.delete(`/api/categoryItems/${testCategoryItem._id}`).expect(200);

      expect(res.body).to.haveOwnProperty('message', 'Item deleted');
    });

    it('should throw an error if category is non existing (delete)', async () => {
      const res = await api.delete(`/api/categoryItems/${testCategoryItem._id}`).expect(404);
    });

    after(() => {
      db.dropDatabase();
      db.close();
    });
  });

  describe.skip('error handling', () => {
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
});
