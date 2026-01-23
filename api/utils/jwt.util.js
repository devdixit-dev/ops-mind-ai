import jwt from 'jsonwebtoken';
import handleResponse from './handleResponse.util.js';

const secret = process.env.JWT_SECRET;

export const encodeJWT = async (payload) => {
  try{
    const encode = await jwt.sign(payload, secret, { expiresIn: '30m' });
    return encode;
  }
  catch(error) {
    console.error("Error in encoding jwt", error);
    return null
  }
}

export const verifyJWT = async (token) => {
  try{
    const verified = await jwt.verify(token, secret);
    return verified;
  }
  catch(error) {
    console.error("Error in verifying jwt", error);
    return null
  }
}

export const decodeJWT = async (token) => {
  try{
    const decode = await jwt.decode(token);
    return decode;
  }
  catch(error) {
    console.error("Error in decoding jwt", error);
    return null
  }
}