import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@booking.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@booking.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin created: ${admin.email}`);
  } else {
    console.log('ℹ️  Admin already exists, skipping...');
  }

  // Create a sample normal user
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@booking.com' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('User@123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Sample User',
        email: 'user@booking.com',
        password: hashedPassword,
        role: 'USER',
      },
    });
    console.log(`✅ Sample user created: ${user.email}`);
  } else {
    console.log('ℹ️  Sample user already exists, skipping...');
  }

  console.log('✅ Seeding complete!');
  console.log('');
  console.log('Default Credentials:');
  console.log('  Admin  → email: admin@booking.com | password: Admin@123');
  console.log('  User   → email: user@booking.com  | password: User@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
