// Vercel Serverless Function - Wraps Express app
import serverlessHttp from 'serverless-http';
import app from '../server/server.js';

// Export the serverless-wrapped Express app
export default serverlessHttp(app);
