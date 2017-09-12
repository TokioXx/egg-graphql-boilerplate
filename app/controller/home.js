'use strict';

module.exports = (app) => {
  class HomeController extends app.Controller {
    async index() {
      this.ctx.body = 'hi, egg';
    }
  }
  return HomeController;
};
