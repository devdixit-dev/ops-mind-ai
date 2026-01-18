import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  companyAdmin: {
    fullname: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      // select: false,
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "Admin"
    }
  },
  companyEmployees: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  companySOP: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Document',
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Company = mongoose.model('Company', CompanySchema)

export default Company;