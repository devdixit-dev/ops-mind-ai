import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';

import createServer from './app.js';
import connectToDatabase from './config/db.config.js';

const port = process.env.PORT;

const startServer = async () => {
  if(cluster.isPrimary) {
    const cpus = os.cpus().length;
    console.log(`MASTER: ${process.pid}`);

    for(let i = 0; i < cpus; i++) {
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

    app.listen(port, () => {
      console.log(`Worker ${process.pid} started and listening on port ${port}`);
    })

    await connectToDatabase();
  }
}

startServer();