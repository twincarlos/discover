'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkDelete(options, null, {});
  }
};
