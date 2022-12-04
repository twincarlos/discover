'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        postId: 1,
        text: "That is so awesome!",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkDelete(options, null, {});
  }
};
