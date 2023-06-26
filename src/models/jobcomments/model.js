'use strict'

const { DataTypes } = require("sequelize")

const jobComments=(sequelize,DataTypes) =>
sequelize.define("jobcomments",{
    content:{
        type:DataTypes.STRING
    },
    usersId:{
        type:DataTypes.INTEGER
    },
    jobsId:{
        type:DataTypes.INTEGER
    }

})

module.exports= jobComments