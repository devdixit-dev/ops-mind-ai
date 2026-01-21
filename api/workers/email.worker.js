import { Worker } from 'bullmq';
import redis from '../config/redis.config.js';
import sendEmail from '../utils/mailer.util.js';

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    await sendEmail(job.data.to, job.data.subject, job.data.html);
    console.log(`Email sent successfully to: ${job.data.to}`);
  },
  {
    connection: redis,
    concurrency: 3
  }
);

emailWorker.on('completed', (job) => {
  console.log(`${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`${job.id} failed cause of ${err}`);
});

emailWorker.on('error', (err) => {
  console.error(`worker error: ${err}`);
});