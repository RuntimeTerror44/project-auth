'use strict'

const { DataTypes } = require("sequelize")

const jobComments=(sequelize,DataTypes) =>
sequelize.define("jobcomments",{
    content:{
        type:DataTypes.STRING
    },
    user_id:{
        type:DataTypes.INTEGER
    },
    job_id:{
        type:DataTypes.INTEGER
    }

})

module.exports= jobComments