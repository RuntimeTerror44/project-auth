"use strict";

const postsModel = (sequelize, DataTypes) =>
  sequelize.define("posts", {
    userId: { type: DataTypes.INTEGER, required: true },
    paragraph_content: { type: DataTypes.STRING },
    photo_content: { type: DataTypes.STRING },
   
  });

module.exports = postsModel;
