'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    caption: {
      type: DataTypes.TEXT
    }
  }, {});
  
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'postOwner' });
    Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE', hooks: true });
    Post.hasMany(models.Like, { foreignKey: 'postId', as: 'likes', onDelete: 'CASCADE', hooks: true });
  };

  return Post;
};