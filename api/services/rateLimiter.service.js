import rateLimit from "express-rate-limit";

const Limiter = (max, limit) => {
  return new rateLimit({
    max: 15,
    limit: 100,
    message: 'Too many requests, try again later !'
  });
}

export default Limiter;