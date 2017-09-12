'use strict';

module.exports = (app) => {
  app.get('/', 'home.index');
  app.post('/api/auth/login', 'auth.login');
  app.resources('users', '/api/users', app.controller.user);
};
