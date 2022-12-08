'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Posts' }
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'commentOwner' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'comments' });
  };

  return Comment;
};