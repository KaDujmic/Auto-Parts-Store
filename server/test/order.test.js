const request = require('supertest');
const models = require('../db/models');
const app = require('../app');

describe('Testing Order endpoints', () => {
  let jwt;
  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'john@example.com',
        password: 'test1234'
      });
    jwt = response._body.token;
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  describe('Testing Order workflow', () => {
    test('Should return 201 on create order', async () => {
      const order =
      {
        id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc20',
        userId: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        deliveryAddress: '4rd Blvd',
        itemList: [
          { id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea', quantity: 201 }
        ]
      };
      const response = await request(app).post('/order').send(order).set('Authorization', `Bearer ${jwt}`);
      expect(response.body.orderStatus).toMatch('pending_confirmation');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(201);
    });
    test('Should return 200 on confirm order', async () => {
      const response = await request(app).put('/order/confirm/a1e679a5-f5a6-4070-8f3d-91ea156bcc20').set('Authorization', `Bearer ${jwt}`);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.orderStatus).toMatch('pending_delivery');
      expect(response.statusCode).toBe(200);
    });
    test('Should return 200 on confirm item for order', async () => {
      const response = await request(app).put('/orderItem/a1e679a5-f5a6-4070-8f3d-91ea156bcc20/fff3cb51-f73a-4fbd-985f-e76054e1a9ea').set('Authorization', `Bearer ${jwt}`);
      expect(response._body[1][0].status).toMatch('delivered');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('Testing restrictions on routes', () => {
    test('Should return 403 for customer on create order route', async () => {
      const loginResponse = await request(app)
        .post('/login')
        .send({
          email: 'mike@example.com',
          password: 'test1234'
        });
      jwt = loginResponse._body.token;
      const order =
        {
          id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc20',
          userId: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
          deliveryAddress: '4rd Blvd',
          itemList: [
            { id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea', quantity: 201 }
          ]
        };
      expect(loginResponse.statusCode).toBe(200);
      const response = await request(app).post('/order').send(order).set('Authorization', `Bearer ${jwt}`);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(403);
    });

    test('Should return 403 for customer on update order route', async () => {
      const loginResponse = await request(app)
        .post('/login')
        .send({
          email: 'mike@example.com',
          password: 'test1234'
        });
      jwt = loginResponse._body.token;
      const order =
        {
          deliveryAddress: '5rd Blvd'
        };
      expect(loginResponse.statusCode).toBe(200);
      const response = await request(app).put('/order/:a1e679a5-f5a6-4070-8f3d-91ea156bcc20').send(order).set('Authorization', `Bearer ${jwt}`);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.statusCode).toBe(403);
    });
  });
});
