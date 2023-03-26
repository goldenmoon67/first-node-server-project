const {Sequelize}=require("sequelize");
const sequelize=new Sequelize('node-server-db','root','21219467107',{dialect:'mysql',host:'localhost'});


module.exports=sequelize;
