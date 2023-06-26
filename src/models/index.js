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

// const usersTable = userModel(sequelize, DataTypes);
const posts = postsModel(sequelize, DataTypes);
// const jobcomments = jobComments(sequelize, DataTypes);
// const comment = commentsModel(sequelize, DataTypes);
const jobs = JobsModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

user.hasMany(posts, { foreignKey: "user_id" });
posts.belongsTo(user, { foreignKey: "user_id" });
// const comments = commentsModel(sequelize, DataTypes);
// const jobs = JobsModel(sequelize, DataTypes);
const jobcomments = jobComments(sequelize, DataTypes);

// usersTable.hasMany(posts , {
//   foreignKey: 'usersId',
//   sourceKey: 'id',
// })

// posts.belongsTo(usersTable, {
//   foriegnKey: 'usersId',
//   targetKey: 'id',
// })

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

// //////////////////////

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
  posts: new Collection(posts),
  users: new Collection(user),
  jobcomments: new Collection(jobcomments),
  jobs: new Collection(jobs),
  userModel: user,
};
