const fs = require('fs');
const path = require('path');

async function seedAdmin() {
  try {
    // Read the seed JSON file
    const seedPath = path.join(__dirname, 'admin.seed.json');
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

    // Extract site URL from .env.local
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Extract CONVEX_SITE_URL manually
    const siteUrlMatch = envContent.match(/CONVEX_SITE_URL=(.+)/);
    if (!siteUrlMatch) {
      throw new Error("Could not find CONVEX_SITE_URL in .env.local");
    }
    const baseUrl = siteUrlMatch[1].trim().replace(/['"]/g, '');

    console.log(`Connecting to Better Auth endpoint at: ${baseUrl}`);
    console.log(`Seeding Admin: ${seedData.email}...`);

    const res = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': baseUrl,
        'Host': new URL(baseUrl).host
      },
      body: JSON.stringify(seedData)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.message || data.error?.message || "Failed to create admin");
    }

    console.log("\n✅ Admin successfully seeded into the database!");
    console.log("You can now securely log in to the /admin portal using:");
    console.log(`Email:   ${seedData.email}`);
    console.log(`Password: ${seedData.password}`);

  } catch (error) {
    console.error("\n❌ Seeding Failed:", error.message);
    if (error.message.includes('fetch')) {
      console.log("\nMake sure your Convex backend is actively running (npx convex dev) in another terminal first!");
    }
  }
}

seedAdmin();
