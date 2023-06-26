"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("./data-collection.js");
const userModel = require("../../src/auth/models/users.js");
const jobComments = require("./jobcomments/model.js");
const postsModel = require("./posts/model.js");
const commentsModel = require("./comments/model.js");
const JobsModel = require("./jobs/model");
const POSTGRESS_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
let sequelize = new Sequelize(POSTGRESS_URI, sequelizeOptions);

const posts = postsModel(sequelize, DataTypes);
const jobcomments = jobComments(sequelize, DataTypes);
const comment = commentsModel(sequelize, DataTypes);

const jobs = JobsModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  comments: new Collection(comment),
  posts: new Collection(posts),
  users: userModel(sequelize, DataTypes),
  jobcomments: new Collection(jobcomments),
  jobs: new Collection(jobs),
};
