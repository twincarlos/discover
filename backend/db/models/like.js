'use strict';

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: { 
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
     },
    postId: { 
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Posts' }
     }
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, { foreignKey: 'userId', as: 'liker' });
    Like.belongsTo(models.Post, { foreignKey: 'userId', as: 'likes' });
  };

  return Like;
};