import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2] || 'admin@storysite.local';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Administrator';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);

  try {
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('User already exists. Updating to admin...');
      await prisma.user.update({
        where: { email },
        data: {
          role: 'admin',
          password: await bcrypt.hash(password, 12)
        }
      });
      console.log('User updated to admin!');
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'admin',
          isActive: true
        }
      });
      console.log('Admin user created successfully!');
    }

    console.log('\nLogin credentials:');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log('\nRemember to change the password after first login!');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
