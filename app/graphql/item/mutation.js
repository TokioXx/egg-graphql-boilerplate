
module.exports = {
  createItem(root, { userID, content, expire }, ctx) {
    return ctx.connector.item.create(userID, content, expire);
  },
  updateItem(root, { id, content, expire, done }, ctx) {
    return ctx.connector.item.update(id, content, expire, done);
  },
  deleteItem(root, { id }, ctx) {
    return ctx.connector.item.delete(id);
  },
};
