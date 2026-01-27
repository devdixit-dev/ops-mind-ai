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
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ops Mind AI - Backend API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html {
            background: black
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: black
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            height: 100%;
            padding: 60px 40px;
            text-align: center;
        }

        h1 {
            font-size: 3em;
            color: #333;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 40px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #f0fdf4;
            border: 2px solid #22c55e;
            border-radius: 50px;
            padding: 12px 24px;
            margin-bottom: 50px;
        }
        
        #author {
            color: blue
        }

        .status-dot {
            width: 12px;
            height: 12px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .status-text {
            color: #166534;
            font-weight: 600;
        }

        .services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .service-card {
            background: linear-gradient(135deg, #f6f8fb 0%, #f1f4f9 100%);
            border-radius: 15px;
            padding: 30px 20px;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .service-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
        }

        .service-name {
            font-size: 1.1em;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .service-desc {
            font-size: 0.9em;
            color: #666;
        }

        .info-section {
            margin-top: 40px;
            padding-top: 40px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 30px;
            text-align: center;
        }

        .info-item {
            padding: 20px;
        }

        .info-label {
            font-size: 0.9em;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }

        .info-value {
            font-size: 1.3em;
            font-weight: 700;
            color: #667eea;
        }

        footer {
            margin-top: 180px;
            padding-top: 30px;
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Ops Mind AI</h1>

        <div class="status">
            <span class="status-dot"></span>
            <span class="status-text">All Systems Operational</span>
        </div>

        <div class="info-section">
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Uptime</div>
                    <div class="info-value">99.9%</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Response Time</div>
                    <div class="info-value">&lt;100ms</div>
                </div>
                <div class="info-item">
                    <div class="info-label">API Version</div>
                    <div class="info-value">v1.0</div>
                </div>
            </div>
        </div>

        <footer>
            <p>&copy; 2026 Ops Mind AI Backend API. All rights reserved.</p>
            <p>Developed by <a id="author" href="https://github.com/devdixit-dev" target="_blank">Dev Dixit</a></p>
        </footer>
    </div>
</body>
</html>
    `)
  });

  return app;
}

export default createServer;