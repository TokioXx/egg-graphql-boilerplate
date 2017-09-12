'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    tags(root, params, ctx) {
      return ctx.connector.tag.fetchRecommandation();
    },
  },
};
