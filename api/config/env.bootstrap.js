import dotenv from 'dotenv';
import path from 'path';

// 1. Load .env explicitly (important for build / workers)
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

const requiredEnvVars = [
  'AUTHOR_EMAIL',
  'MAILJET_PORT',
  'MAILJET_URI',
  'MAILJET_USER',
  'MAILJET_PASS'
];

// 3. Validate
const missingVars = requiredEnvVars.filter(
  (key) => !process.env[key]
);

if (missingVars.length > 0) {
  throw new Error(
    `❌ Missing required environment variables: ${missingVars.join(', ')}`
  );
}

// 4. Optional success log (dev only)
if (process.env.NODE_ENV !== 'production') {
  console.log('✅ Environment variables loaded successfully');
}
