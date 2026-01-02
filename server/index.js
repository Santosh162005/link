import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import contentRoutes from './routes/content-sqlite.js';
import { initDB } from './models/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Initialize SQLite Database
await initDB();

// Routes
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
