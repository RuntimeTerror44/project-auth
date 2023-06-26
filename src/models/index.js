"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("./data-collection.js");
const postsModel = require("./posts/model.js");
const commentsModel = require("./comments/model.js");
const userModel = require("../../src/auth/models/users.js");
const JobsModel = require("./jobs/model");
const jobComments = require("./jobcomments/model.js");

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

const usersTable = userModel(sequelize, DataTypes);
const posts = postsModel(sequelize, DataTypes);
const comments = commentsModel(sequelize, DataTypes);
const jobs = JobsModel(sequelize, DataTypes);
const jobcomments = jobComments(sequelize, DataTypes);

usersTable.hasMany(posts, {
  foreignKey: "userId",
  sourceKey: "id",
});

posts.belongsTo(usersTable, {
  foriegnKey: "userId",
  targetKey: "id",
});

// posts.hasMany(comments , {
//   foreignKey: 'postsId',
//   sourceKey: 'id',
// })

// comments.belongsTo(usersTable, {
//   foriegnKey: 'usersId',
//   targetKey: 'id',
// })

// comments.belongsTo(posts, {
//   foriegnKey: 'postsId',
//   targetKey: 'id',
// })

//////////////////////

// jobs.belongsTo(usersTable, {
//   foriegnKey: 'usersId',
//   targetKey: 'id',
// })

// jobs.hasMany(jobcomments , {
//   foreignKey: 'jobsId',
//   sourceKey: 'id',
// })

// jobcomments.belongsTo(usersTable, {
//   foriegnKey: 'usersId',
//   targetKey: 'id',
// })

// jobcomments.belongsTo(jobs, {
//   foriegnKey: 'jobsId',
//   targetKey: 'id',
// })

module.exports = {
  db: sequelize,
  users: usersTable,
  posts: new Collection(posts),
  comments: new Collection(comments),
  jobs: new Collection(jobs),
  jobcomments: new Collection(jobcomments),
};
