require('dotenv').config();
// require('dotenv').config({ debug: true });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
};

