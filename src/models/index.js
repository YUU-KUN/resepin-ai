const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        port: config.development.port,
        dialect: config.development.dialect,
        // logging: console.log
        logging: false, // Disable Sequelize logs
    }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.UserCreation = require('./usercreation')(sequelize, Sequelize);

module.exports = db;
