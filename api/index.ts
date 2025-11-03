// Register path aliases programmatically for Vercel runtime
// This MUST be done before any imports that use path aliases
import * as path from 'path';
import { register } from 'tsconfig-paths';

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

// Now import modules that use path aliases - these will work because register() was called above
// Using require() here ensures they load after path registration
const { connectDatabase } = require('@db/connect');
const app = require('../app').default;

// Connect to database when serverless function starts
connectDatabase().catch((error: Error) => {
  console.error('Failed to connect to database:', error);
});

export default app;
