import 'dotenv/config';

import Company from '../models/company.model.js';
import connectToDatabase from '../config/db.config.js';

const seedCompanies = async () => {
  await connectToDatabase();
  try {
    const companies = [
      {
        companyName: 'nova tech',
        companyAdmin: {
          fullname: 'Amit Sharma',
          email: 'amit@novatech.com',
          password: 'password123',
          role: 'Admin'
        },
        companySOP: 'All employees must follow standard working hours and security policies.',
        isVerified: true,
        isActive: true
      },
      {
        companyName: 'bluewave solutions',
        companyAdmin: {
          fullname: 'Ritika Mehta',
          email: 'ritika@bluewave.com',
          password: 'bluewave@123',
          role: 'Admin'
        },
        companySOP: 'Remote work allowed with prior approval from management.',
        isVerified: true,
        isActive: true
      },
      {
        companyName: 'vertex systems',
        companyAdmin: {
          fullname: 'Rahul Verma',
          email: 'rahul@vertexsys.com',
          password: 'vertex123',
          role: 'Admin'
        },
        companySOP: 'Employees must complete security training within 30 days of joining.',
        isVerified: false,
        isActive: true
      },
      {
        companyName: 'zenbyte labs',
        companyAdmin: {
          fullname: 'Neha Kapoor',
          email: 'neha@zenbyte.io',
          password: 'zenbyte@admin',
          role: 'Admin'
        },
        companySOP: 'Strict no-device policy inside secure lab areas.',
        isVerified: true,
        isActive: false
      },
      {
        companyName: 'cloudnest',
        companyAdmin: {
          fullname: 'Saurabh Jain',
          email: 'saurabh@cloudnest.com',
          password: 'cloudnest123',
          role: 'Admin'
        },
        companySOP: 'Daily standups are mandatory for all engineering teams.',
        isVerified: false,
        isActive: false
      },
      {
        companyName: 'codeforge',
        companyAdmin: {
          fullname: 'Pooja Malhotra',
          email: 'pooja@codeforge.dev',
          password: 'forge@2024',
          role: 'Admin'
        },
        companySOP: 'Code reviews are required before merging to main branch.',
        isVerified: true,
        isActive: true
      }
    ];

    for (const company of companies) {
      const exists = await Company.findOne({ email: company.companyAdmin.email });

      if (!exists) {
        await Company.create(company);
        console.log(`Created user: ${company.companyAdmin.email}`);
      } else {
        console.log(`Company already exists: ${company.companyAdmin.email}`);
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedCompanies();