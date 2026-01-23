import bcrypt from "bcryptjs";
import Company from "../models/company.model.js";
import { getWelcomeEmail } from "../templates/auth.template.js";
import { hashPassword } from "../utils/bcrypt.util.js";
import generateOTP from "../utils/genOtp.util.js";
import handleResponse from "../utils/handleResponse.util.js";
import { encodeJWT, verifyJWT } from "../utils/jwt.util.js";
import sendEmail from "../utils/mailer.util.js";
import User from "../models/user.model.js";

export const AuthInit = async (req, res) => {
  try {
    const { companyEmail, fullname, companyName, password } = req.body;

    if (!companyEmail || !fullname || !companyName || !password) {
      return handleResponse(res, 400, false, "All fields are required!");
    }

    const company = await Company.findOne({
      "companyAdmin.email": companyEmail
    }).lean();

    if (company) return handleResponse(res, 400, false, "Account already exist");

    const hash = await hashPassword(password, 10);

    const newCompany = await Company.create({
      companyName,
      companyAdmin: {
        fullname, email: companyEmail,
        password: hash
      }
    });

    const otp = await generateOTP();

    const payload = {
      id: newCompany._id,
      otp
    }

    const token = await encodeJWT(payload);

    const { subject, html, text } = getWelcomeEmail(
      newCompany.companyAdmin.fullname,
      newCompany.companyAdmin.email
    );

    await sendEmail(
      newCompany.companyAdmin.email,
      subject,
      html,
      text
    );

    const filteredInfo = {
      id: newCompany._id,
      company: newCompany.companyName,
      fullname: newCompany.companyAdmin.fullname,
      email: newCompany.companyAdmin.email
    }

    res.cookie('v_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 60 * 1000
    });

    return handleResponse(
      res, 201, true, "Account created successfully", filteredInfo
    );
  }
  catch (error) {
    console.error("Error in auth init:", error);
    return handleResponse(res, 500, false, "Internal server error");
  }
}

export const VerifyCompany = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return handleResponse(res, 400, false, 'OTP is required for verification');

    const token = req.cookies.v_token;
    if (!token) return handleResponse(res, 400, false, 'Token not provided');

    const verified = await verifyJWT(token);
    if (!verified) return handleResponse(res, 401, false, 'Unauthorised access denied');

    if (verified.otp !== otp) return handleResponse(res, 403, false, 'Invalid or expired OTP');

    const company = await Company.findByIdAndUpdate(
      verified.id,
      { isActive: true, isVerified: true }
    ).lean();
    if (!company) return handleResponse(res, 404, false, 'Company not found');

    return handleResponse(res, 200, true, 'Company is verified');
  }
  catch (error) {
    console.error("Error in company verification", error);
    return handleResponse(res, 500, false, 'Internal servere error');
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return handleResponse(res, 400, false, 'All fields are required for login');

    if (role === 'Admin') {
      const company = await Company.findOne({
        "companyAdmin.email": companyEmail
      }).select("companyAdmin.password").lean();
      if (!company) return handleResponse(res, 404, false, 'Company not found or not exist');

      const decodePassword = await bcrypt.compare(password, company.companyAdmin.password);
      if (!decodePassword) return handleResponse(res, 400, false, 'Invalid email or password');
      if (role !== company.companyAdmin.role) return handleResponse(res, 403, false, 'Role mismatch');

      const payload = {
        id: company._id,
        email: company.companyAdmin.email,
        role: company.companyAdmin.role,
        verified: company.isVerified,
      }
      const token = await encodeJWT(payload);

      res.cookie('a_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000
      });
    } else {
      const user = await User.findOne({
        email: email
      }).select("+password").lean();
      if (!user) return handleResponse(res, 404, false, 'User not found or not exist');

      const decodePassword = await bcrypt.compare(password, user.password);
      if (!decodePassword) return handleResponse(res, 400, false, 'Invalid email or password');
      if (role !== user.role) return handleResponse(res, 403, false, 'Role mismatch');

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        verified: user.isVerified,
        company: user.company
      }
      const token = await encodeJWT(payload);

      res.cookie('a_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000
      });
    }

    return handleResponse(res, 200, true, 'Logged in successfully');
  }
  catch (error) {
    console.error("Error in login", error);
    return handleResponse(res, 500, false, 'Internal server error');
  }
}