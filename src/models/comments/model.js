"use strict";

const commentsModel = (sequelize, DataTypes) =>
  sequelize.define("comments", {
    content: { type: DataTypes.STRING, required: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = commentsModel;

