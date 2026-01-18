import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,

  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  }
});

redis.on('connect', () => {
  console.log(`Redis connected`);
});

redis.on('error', (error) => {
  console.error(`Redis error: ${error}`);
});

export default redis;