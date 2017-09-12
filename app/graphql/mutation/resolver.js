'use strict';


const _ = require('lodash');

module.exports = {
  Mutation: _.merge(require('../item/mutation'), require('../tag/mutation')),
};
