// Register path aliases programmatically for Vercel runtime
// This must be done before any imports that use path aliases
import * as path from 'path';
import { connectDatabase } from '@db/connect';
import { register } from 'tsconfig-paths';

import app from '../app';

// Resolve baseUrl: in Vercel, compiled files are in /var/task, and api/index.js is in /var/task/api
// So we go up one level to get the project root
const baseUrl = path.resolve(__dirname, '..');

// Register path aliases - paths must match the patterns in tsconfig.json
register({
  baseUrl,
  paths: {
    '@*': ['./*'],
    '@db/*': ['./db/*'],
    '@controllers/*': ['./controllers/*'],
    '@routes/*': ['./routes/*'],
    '@middlewares/*': ['./middlewares/*'],
    '@models/*': ['./models/*'],
    '@types/*': ['./types/*'],
    '@utils/*': ['./utils/*'],
    '@constants/*': ['./constants/*'],
    '@classes/*': ['./classes/*']
  }
});

// Connect to database when serverless function starts
connectDatabase().catch(error => {
  console.error('Failed to connect to database:', error);
});

export default app;
