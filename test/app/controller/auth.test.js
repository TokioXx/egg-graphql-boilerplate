'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/auth.test.js', () => {
  const name = 'auth-test';
  const password = 'auth-password';

  before(() => app.httpRequest()
    .post('/api/auth/register')
    .send({
      name, password,
    })
    .expect(200));

  it('login', () => app.httpRequest()
    .post('/api/auth/login')
    .send({
      name, password,
    })
    .expect(200));

  after(() => app.model.User.destroy({ where: { name } }));
});
