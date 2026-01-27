import handleResponse from "../utils/handleResponse.util.js";
import User from "../models/user.model.js";

import {hashPassword} from "../utils/bcrypt.util.js";
import sendEmail from "../utils/mailer.util.js";

export const adminDashboard = (req, res) => {
  try{

  }
  catch (e) {
    console.error("Error in admin dash", e.message);
    return handleResponse(res, 500, false, "Internal server error");
  }
}

export const addEmployee = async (req, res) => {
  try{
    const { fullname, email, password } = req.body;
    if(!fullname || !email || !password) return handleResponse(res, 400, false, "All fields are required for add employee");

    const hash = await hashPassword(password, 10);

    const newUser = await User.create({
      fullname, email, password: hash,
      company: req.user.id,
      isVerified: true, isActive: true
    });

    await sendEmail(
        email,
        `OpsMind AI - Credentials`,
        `Hi, ${fullname}. Your account is created by your admin associated with email: ${email}.\nEmail: ${email}, Password: ${password}`
    );

    return handleResponse(res, 201, true, `${fullname} added as employee`, newUser);
  }
  catch (e) {
    console.error("Error in add employee - admin", e.message);
    return handleResponse(res, 500, false, "Internal server error");
  }
}

export const allEmployees = async (req, res) => {
  try{
    const all = await User.find({
      company: req.user.id,
      isVerified: true,
      isActive: true
    }).lean();

    return handleResponse(res, 200, true, "Employees fetched", all);
  }
  catch (e) {
    console.error("Error in getting all employees", e.message);
    return handleResponse(res, 500, false, "Internal server error");
  }
};

export const updateEmployee = async (req, res) => {
  try{
    const id = req.params.id;
    if(!id) return handleResponse(res, 403, false, "Employee ID is required for this operation");

    const { fullname, email, password } = req.body;
    const payload = {};

    if(fullname) payload.fullname = fullname;
    if(email) payload.email = email;
    if(password) {
      const hash = await hashPassword(password, 10);
      payload.password = hash;
    }

    await User.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    );

    return handleResponse(res, 200, true, "Employee details updated successfully");
  }
  catch (e) {
    console.error("Error in updating employee", e.message);
    return handleResponse(res, 500, false, "Internal server error");
  }
};

export const deleteEmployee = async (req, res) => {
  try{

  }
  catch (e) {
    console.error("Error in deleting employee", e.message);
    return handleResponse(res, 500, false, "Internal server error");
  }
};