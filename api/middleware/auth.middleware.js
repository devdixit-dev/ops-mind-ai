import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import handleResponse from "../utils/handleResponse.util.js";
import { verifyJWT } from "../utils/jwt.util.js";


export const auth = async (req, res, next) => {
  try{
    const token = req.cookies.a_token;
    if(!token) return handleResponse(res, 403, false, 'Token not provided');

    const decoded = await verifyJWT(token);
    if(!decoded) return handleResponse(res, 401, false, 'Unauthorised access denied');

    req.user = decoded;
    next();
  }
  catch(error) {
    console.error("Error in auth middleware", error);
    return handleResponse(res, 500, false, 'Internal server error');
  }
}

export const isAdmin = async (req, res, next) => {
  try{
    const id = req.user.id;
    if(!id) return handleResponse(res, 403, false, 'User not found or error in something');

    if(req.user.role !== "Admin") return handleResponse(res, 403, false, "Role mismatch detected");

    const user = await Company.findById(id).lean();
    if(!user) return handleResponse(res, 404, false, 'User not found or not exist');

    req.user = user
    next(); 
  }
  catch(error) {
    console.error("Error in is admin middleware", error);
    return handleResponse(res, 500, false, 'Internal server error');
  }
}