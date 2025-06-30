import express from 'express';
import cors from 'cors';

const app = express();

// Add this before your routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
