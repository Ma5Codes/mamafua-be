import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('Account API Endpoints', () => {
  let token;

  it('should register a new account', async () => {
    const newAccount = {
      email: 'testuser@gmail.com',
      name: 'Test User',
      password: 'password123',
    };

    const res = await request(app).post('/api/auth/register').send(newAccount);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');

    token = res.body.token; // Save token for authentication tests
  });

  it('should log in the registered account', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'testuser@gmail.com',
      password: 'password123',
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should retrieve user info', async () => {
    const res = await request(app)
      .get('/api/info')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('email', 'testuser@gmail.com');
  });
});
