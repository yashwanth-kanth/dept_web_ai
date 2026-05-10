import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { auth } from './src/auth.js';
import { pool } from './src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seedAdmin() {
  const seedPath = path.join(__dirname, 'admin.seed.json');
  const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const email = seedData.email.toLowerCase();

  const ctx = await auth.$context;
  let user = await ctx.adapter.findOne({
    model: 'user',
    where: [{ field: 'email', value: email }],
  });

  if (!user) {
    user = await ctx.internalAdapter.createUser({
      name: seedData.name || 'Admin',
      email,
      emailVerified: true,
    });
    console.log(`Created admin user: ${email}`);
  } else {
    await ctx.internalAdapter.updateUser(user.id, {
      name: user.name || seedData.name || 'Admin',
      emailVerified: true,
      updatedAt: new Date(),
    });
    console.log(`Found existing admin user: ${email}`);
  }

  const hashedPassword = await ctx.password.hash(seedData.password);
  const account = await ctx.adapter.findOne({
    model: 'account',
    where: [
      { field: 'userId', value: user.id },
      { field: 'providerId', value: 'credential' },
    ],
  });

  if (account) {
    await ctx.internalAdapter.updatePassword(user.id, hashedPassword);
    console.log('Updated admin password.');
  } else {
    await ctx.internalAdapter.createAccount({
      userId: user.id,
      accountId: user.id,
      providerId: 'credential',
      password: hashedPassword,
    });
    console.log('Created admin credential account.');
  }

  console.log('\nAdmin login:');
  console.log(`Email: ${email}`);
  console.log(`Password: ${seedData.password}`);
}

seedAdmin()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
