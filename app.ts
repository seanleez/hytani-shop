import path from 'path';
import { connectDatabase } from '@db/connect';
import authRouter from '@routes/auth.route';
import balanceRouter from '@routes/balance.route';
import cartRouter from '@routes/cart.route';
import productRouter from '@routes/product.route';
import profileRouter from '@routes/profile.route';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';

import { authMiddleware, errorHandlerMiddleware, notFoundMiddleware } from './middlewares';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', authMiddleware, profileRouter);
app.use('/api/v1/balance', authMiddleware, balanceRouter);
app.use('/api/v1/products', authMiddleware, productRouter);
app.use('/api/v1/cart', authMiddleware, cartRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

console.log('🚀 ~ app:');

// Export app for Vercel serverless function
export default app;

// Start server only if not in Vercel serverless environment
if (!process.env.VERCEL) {
  const startApplication = async () => {
    try {
      await connectDatabase();
      app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
      console.log(error);
    }
  };

  startApplication();
}
