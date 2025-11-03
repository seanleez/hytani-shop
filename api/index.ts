// Register path aliases for Vercel runtime - must be FIRST before any other imports
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const moduleAlias = require('module-alias');

// In Vercel, compiled files are in /var/task
// The api/index.js file is at /var/task/api/index.js, so base is /var/task
const rootPath = path.resolve(__dirname, '..');

// Register path aliases using module-alias (more reliable than tsconfig-paths for runtime)
moduleAlias.addAliases({
  '@': rootPath,
  '@db': path.join(rootPath, 'db'),
  '@controllers': path.join(rootPath, 'controllers'),
  '@routes': path.join(rootPath, 'routes'),
  '@middlewares': path.join(rootPath, 'middlewares'),
  '@models': path.join(rootPath, 'models'),
  '@types': path.join(rootPath, 'types'),
  '@utils': path.join(rootPath, 'utils'),
  '@constants': path.join(rootPath, 'constants'),
  '@classes': path.join(rootPath, 'classes')
});

// Now we can require modules using path aliases
const { connectDatabase } = require('@db/connect');
const app = require('../app').default;

// Connect to database when serverless function starts
connectDatabase().catch((error: Error) => {
  console.error('Failed to connect to database:', error);
});

export default app;
