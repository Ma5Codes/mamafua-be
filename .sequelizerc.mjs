import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)); // Get the current directory

export default {
  config: resolve(__dirname, 'config', 'database.mjs'), // Use absolute path
  'models-path': resolve(__dirname, 'app', 'models'),
  'migrations-path': resolve(__dirname, 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'database', 'seeders'), // ✅ FIXED path
};
