import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  companyAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  companyEmployees: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  companySOP: {
    type: String,
    required: true,
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