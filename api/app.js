import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import AuthRouter from './routes/auth.route.js';
import AdminRouter from './routes/admin.route.js';
import UserRouter from './routes/user.route.js';

const createServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use((req, _, next) => {
    console.log(`${req.url} - ${req.method} - ${req.ip}`);
    next();
  });

  app.use('/api/auth', AuthRouter);
  app.use('/api/admin', AdminRouter);
  app.use('/api/user', UserRouter);

  app.get("/", (req, res) => {
    res.send('Home page of OpsMind AI');
  });

  return app;
}

export default createServer;