import bcrypt from "bcryptjs";
import handleResponse from "./handleResponse.util.js";

export const hashPassword = async (password, salt) => {
  try{
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }
  catch(error) {
    console.error(`Error in hashing password: ${error}`);
    return handleResponse(null, 500, false, "Internal server error");
  }
}

export const comparePassword = async (password, hash) => {
  try{
    const compare = await bcrypt.compare(password, hash)
    return compare;
  }
  catch(error) {
    console.error(`Error comparing password: ${error}`);
    return handleResponse(null, 500, false, "Internal server error");
  }
}