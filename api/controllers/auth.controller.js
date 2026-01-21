import Company from "../models/company.model.js";
import emailQueue from "../queues/email.queue.js";
import { getWelcomeEmail } from "../templates/auth.template.js";
import { hashPassword } from "../utils/bcrypt.util.js";
import handleResponse from "../utils/handleResponse.util.js";

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

    // todo: send welcome email to the newUser.email
    await emailQueue.add('emailQueue', {
      to: newCompany.companyAdmin.email,
      ...getWelcomeEmail(
        newCompany.companyAdmin.fullname,
        newCompany.companyAdmin.email
      )
    });

    return handleResponse(
      res, 201, true, "Account created successfully", newCompany
    );
  }
  catch (error) {
    console.error("Error in auth init:", error);
    return handleResponse(res, 500, false, "Internal server error");
  }
}