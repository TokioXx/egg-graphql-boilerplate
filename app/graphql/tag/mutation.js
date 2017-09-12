
module.exports = {
  attachTag(root, { itemID, tag }, ctx) {
    return ctx.connector.tag.attach(itemID, tag);
  },
  removeTag(root, { id }, ctx) {
    return ctx.connector.tag.remove(id);
  },
};
