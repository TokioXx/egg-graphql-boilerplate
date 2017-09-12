'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/graphql/tag.test.js', () => {
  let user;
  let item;
  let tag;

  before(async () => {
    user = await app.model.User.create({
      name: 'test-name',
      password: 'test-password',
    });
    item = await app.model.Item.create({
      user_id: user.id,
      content: 'item',
    });
    tag = await app.model.Tag.create({
      item_id: item.id,
      content: 'tag',
    });
  });

  it('attach tag', function* fetchUser() {
    const ctx = app.mockContext();
    const query = JSON.stringify({
      query: `
      mutation {
        attachTag (itemID: ${item.id}, tag: "hello") {
          content
        }
      }`,
    });

    const data = yield ctx.service.graphql.query(query);
    assert.equal(data.data.attachTag.content, 'hello');
  });

  it('remove tag', function* fetchUser() {
    const ctx = app.mockContext();
    const query = JSON.stringify({
      query: `
      mutation {
        removeTag (id: ${tag.id}) {
          content
        }
      }`,
    });

    const data = yield ctx.service.graphql.query(query);
    assert.equal(data.data.removeTag.content, 'tag');
  });

  after(async () => {
    await app.model.User.destroy({ where: { id: user.id } });
    await app.model.Item.destroy({ where: { user_id: user.id } });
    await app.model.Tag.destroy({ where: { item_id: item.id } });
  });
});
