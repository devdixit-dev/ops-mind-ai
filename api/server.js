import cluster from 'cluster';
import os from 'os';

import createServer from './app.js';
import connectToDatabase from './config/db.config.js';

const port = process.env.PORT;

const startServer = async () => {
  if (cluster.isPrimary) {
    const cpus = os.cpus().length;
    console.log(`MASTER: ${process.pid}`);

    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.error(
        `Worker ${worker.process.pid} died. Restarting...`
      );
      cluster.fork();
    })
  } else {
    const app = await createServer();
    await connectToDatabase();
    
    app.listen(port, () => {
      console.log(`API is running at http://localhost:${port} 🚀`);
      console.log(`Node Environment - ${process.env.NODE_ENV}`);
      console.log(`Worker ${process.pid} started and listening on port ${port}`);
    });
  }
}

startServer().catch((e) => { console.error("Error in starting server", e.message) })