import 'dotenv/config';

import User from '../models/user.model.js';
import connectToDatabase from '../config/db.config.js';

const seedUsers = async () => {
  await connectToDatabase();

  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'Admin',
      },
      {
        name: 'Employee User',
        email: 'employee@example.com',
        password: 'Employee@123',
        role: 'Employee',
      },
    ];

    for (const user of users) {
      const exists = await User.findOne({ email: user.email });

      if (!exists) {
        await User.create(user);
        console.log(`Created user: ${user.email}`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedUsers();
