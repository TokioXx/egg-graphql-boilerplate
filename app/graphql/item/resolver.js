'use strict';

module.exports = {
  User: {
    items(root, _, ctx) {
      return ctx.connector.item.fetchByUserId(root.id);
    },
  },
};
