'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/graphql/item.test.js', () => {
  let user;
  let item;

  before(async () => {
    user = await app.model.User.create({
      name: 'test-name',
      password: 'test-password',
    });
  });

  beforeEach(async () => {
    item = await app.model.Item.create({
      user_id: user.id,
      content: 'item',
    });
  });

  it('create', function* create() {
    const ctx = app.mockContext();

    const content = 'item_create';
    const query = JSON.stringify({
      query: `
      mutation {
        createItem(userID: ${user.id}, content: "${content}") {
          id
          content
        }
      }
      `,
    });

    const data = yield ctx.service.graphql.query(query);
    assert.equal(data.data.createItem.content, content);
  });

  it('update', function* update() {
    const ctx = app.mockContext();

    const content = 'item_update';
    const query = JSON.stringify({
      query: `
      mutation {
        updateItem(id: ${item.id}, content: "${content}") {
          content
        }
      }
      `,
    });

    const data = yield ctx.service.graphql.query(query);
    assert.equal(data.data.updateItem.content, content);
  });

  it('delete', function* deleteItem() {
    const ctx = app.mockContext();

    const query = JSON.stringify({
      query: `
      mutation {
        deleteItem(id: ${item.id}) {
          content
        }
      }
      `,
    });

    const data = yield ctx.graphql.query(query);
    assert.equal(data.data.deleteItem.content, 'item');
  });

  afterEach(async () => {
    await app.model.Item.destroy({ where: { user_id: user.id } });
  });

  after(async () => {
    await app.model.User.destroy({ where: { id: user.id } });
  });
});
