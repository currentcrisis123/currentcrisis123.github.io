import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectDB from "./middleware/db.js";

import articleRouter from './routes/Article.route.js';
import categoryRouter from './routes/Category.route.js';
import developersRouter from './routes/Developers.route.js';
import patchNotesRouter from './routes/PatchNotes.route.js';

dotenv.config({ path: "../.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.headers.origin || 'unknown'}`);
  next();
});

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://currentcrisis-test.netlify.app",
        "https://currentcrisis.net",
        "https://www.currentcrisis.net"
      ];

      if (!origin) {
        console.log("Request has no origin, allowing");
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        // console.log(`Origin ${origin} is allowed by CORS`);
        callback(null, true);
      } else {
        console.log(`Origin ${origin} is blocked by CORS`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you're using cookies or auth headers
    optionsSuccessStatus: 200 // For legacy browser support
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Current Crisis API is running' });
});

{/* ROUTES */}
app.use('/api/articles', articleRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/developers', developersRouter);
app.use('/api/patch_notes', patchNotesRouter);

// Test endpoint for checking API
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API test endpoint is working', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
