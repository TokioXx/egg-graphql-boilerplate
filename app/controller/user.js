'use strict';

module.exports = (app) => {
  class UserController extends app.Controller {
    async create() {
      const { ctx } = this;
      const createRule = {
        name: { type: 'string' },
        password: { type: 'string' },
      };
      // 校验参数
      ctx.validate(createRule);

      await ctx.model.User.create(ctx.request.body);
      ctx.body = {
        code: 0,
        message: 'success',
      };
    }
  }
  return UserController;
};
