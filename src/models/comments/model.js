"use strict";

const commentsModel = (sequelize, DataTypes) =>
  sequelize.define("comments", {
    content: { type: DataTypes.STRING, required: true },
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = commentsModel;

