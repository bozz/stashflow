const express = require('express');
const request = require('supertest');

const dbHelper = require('../helpers/testdb');
const createSampleData = require('../helpers/createSampleData');

const accounts = require('../../routers/accounts');

let db;

describe('routers/accounts', () => {
  beforeAll(async () => {
    db = await dbHelper.init();
    await createSampleData(db);
  });

  describe('calling getAll endpoint', () => {
    it('should return all acounts', async () => {
      const app = express();
      app.use('/', accounts);

      const response = await request(app).get('/');
      expect(response.statusCode).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveLength(2);
    });
  });
});
