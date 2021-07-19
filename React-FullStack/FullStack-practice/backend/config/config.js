const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "mysqldb",
    "dialect": "mysql",
    "operatorsAliases": false,
    "timezone": "+09:00"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
