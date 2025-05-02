import express from 'express';
import { sequelize } from './database/db';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './router/authRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api', authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err);
  });
