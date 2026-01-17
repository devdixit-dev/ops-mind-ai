import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.util.js";
import handleResponse from "../utils/handleResponse.util.js";

export const AuthInit = async (req, res) => {
  try {
    const { companyEmail, fullname, companyName, password } = req.body;

    const user = await User.findOne({ email: companyEmail }).select("+password");
    if (user || user.isActive) return handleResponse(res, 400, false, "Account already exist");

    const hash = await hashPassword(password, 10);

    const newUser = await User.create({
      fullname, email: companyEmail, company: companyName,
      password: hash, role: "Admin"
    });

    const newCompany = await Company.create({
      companyName,
      companyAdmin: newUser._id
    });

    // todo: send welcome email to the newUser.email

    return handleResponse(
      res, 201, true, "Account created successfully", newUser, newCompany
    );
  }
  catch (error) {
    console.error(`Error in auth init: ${error}`);
    return handleResponse(res, 500, false, "Internal server error");
  }
}