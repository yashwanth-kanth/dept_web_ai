import { betterAuth } from 'better-auth';
import { pool } from './db.js';

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'https://ramcoad.com',
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  trustedOrigins: [process.env.FRONTEND_URL || 'https://ramcoad.com'],
  advanced: {
    ipAddress: {
      trustedProxies: ['127.0.0.1'],
    },
  },
});
