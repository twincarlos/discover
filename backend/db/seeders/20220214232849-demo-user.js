'use strict';

const bcrypt = require('bcryptjs');

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        username: 'Demo1',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png'
      },
      {
        username: 'Demo2',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png'
      },
      {
        username: 'Demo3',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo1', 'Demo2', 'Demo3'] }
    }, {});
  }
};
