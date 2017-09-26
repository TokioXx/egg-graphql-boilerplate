exports.login = async (ctx) => {
  const createRule = {
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  };
  // 校验参数
  ctx.validate(createRule);

  const user = await ctx.model.User.findOne({
    where: ctx.request.body,
  });
  if (!user) {
    ctx.body = {
      code: '10000',
      message: '用户不存在',
    };
  }

  ctx.session.user = user;
  ctx.body = {
    code: '0',
    message: 'success',
    data: user,
  };
};

exports.register = async (ctx) => {
  const createRule = {
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  };
  // 校验参数
  ctx.validate(createRule);

  const user = await ctx.model.User.create(ctx.request.body);
  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      user: {
        name: user.name,
      },
    },
  };
};
