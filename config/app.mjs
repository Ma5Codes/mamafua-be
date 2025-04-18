'use strict';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  appKey: process.env.APP_KEY,
  appUrl: process.env.APP_URL,
  appPort: process.env.APP_PORT,
};

export default config;