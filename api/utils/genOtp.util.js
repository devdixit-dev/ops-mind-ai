import crypto from 'crypto';

const generateOTP = () => {
  return crypto.randomInt(10000000, 100000000);
}

export default generateOTP;