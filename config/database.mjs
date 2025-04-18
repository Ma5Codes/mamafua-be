'use strict';
import dotenv from 'dotenv';
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const config = {
  development: {
    username: DB_USER || 'root',
    password: DB_PASSWORD || null,
    database: DB_NAME || 'dev_db',
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: DB_USER || 'root',
    password: DB_PASSWORD || null,
    database: DB_NAME || 'test_db',
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: DB_USER || 'root',
    password: DB_PASSWORD || null,
    database: DB_NAME || 'prod_db',
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
};

export default config;