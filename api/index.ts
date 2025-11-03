// Register path aliases for runtime resolution in Vercel
import 'tsconfig-paths/register';

import { connectDatabase } from '@db/connect';

import app from '../app';

// Connect to database when serverless function starts
connectDatabase().catch(error => {
  console.error('Failed to connect to database:', error);
});

export default app;
