import express from 'express';
import routerAll from './app/router/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
process.env.TZ = 'Asia/Makassar';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS Configuration
const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Set the base path to '/api' for all routes
app.use('/api', routerAll);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


// Static file serving (Cross-platform compatibility)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Welcome to the Laundry API. Use /api for API routes.');
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}, http://localhost:${port}`);
  });
}

export default app;

