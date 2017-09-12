'use strict';

module.exports = {
  Item: {
    tags(root, _, ctx) {
      return ctx.connector.tag.fetchByItemId(root.id);
    },
  },
};
