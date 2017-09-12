module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Tag = app.model.define('tag', {
    item_id: INTEGER,
    content: STRING(64),
  });

  return Tag;
};
