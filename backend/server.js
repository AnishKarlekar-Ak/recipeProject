// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';

import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // change based on frontend origin
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1); // Add this above session middleware


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretKey',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 30 * 60, // 30 minutes
  }),
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    secure: false, // ✅ must be false in localhost
    sameSite: 'lax' // add this
  }
  
}));
app.use((req, res, next) => {
  console.log('🔐 Session:', req.session);
  next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Root
app.get('/', (req, res) => {
  res.send('RecipeHub API running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
