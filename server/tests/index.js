import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';

import app, { db } from '../';
import { CategoryItemController, InstructionController } from '../controllers';
import CategoryItemModel from '../model/Category';
import InstructionModel from '../model/Instruction';

const { expect } = chai;
const api = supertest.agent(app);

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
      expect(res.body[0].instructions).to.be.an('array');
    });

    it('should create new category Items without instructions', async () => {
      const res = await api.post('/api/categoryItems')
        .send({ title: 'Checkout branches' })
        .expect(201);

      expect(res.body).to.haveOwnProperty('title', 'Checkout branches');

      const res2 = await api.get('/api/categoryItems').expect(200);
      expect(res2.body).to.deep.include(res.body);
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
