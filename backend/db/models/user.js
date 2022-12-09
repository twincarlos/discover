'use strict';
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      default: 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png'
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ['hashedPassword', 'createdAt', 'updatedAt']
          }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
    );

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, profilePicture } = this; // context will be the User instance
    return { id, username, profilePicture };
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.login = async function ({ username, password }) {
    const user = await User.scope('loginUser').findOne({ where: { username } });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ username, hashedPassword });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'postOwner' });
    User.hasMany(models.Comment, { foreignKey: 'userId', as: 'commentOwner' });
    User.hasMany(models.Like, { foreignKey: 'userId', as: 'liker' });
  };

  return User;
};
