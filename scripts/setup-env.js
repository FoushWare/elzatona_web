#!/usr/bin/env node

/**
 * Environment Setup Script
 *
 * This script helps users set up their environment variables
 * by copying from env.example and prompting for required values.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = query => new Promise(resolve => rl.question(query, resolve));

async function setupEnvironment() {
  console.log('🔧 Setting up environment variables...\n');

  const envExamplePath = path.join(__dirname, '..', 'env.example');
  const envPath = path.join(__dirname, '..', '.env');

  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    const overwrite = await question(
      '⚠️  .env file already exists. Overwrite? (y/N): '
    );
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Setup cancelled.');
      rl.close();
      return;
    }
  }

  // Copy from env.example
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Copied env.example to .env');
  } else {
    console.log('❌ env.example not found!');
    rl.close();
    return;
  }

  console.log('\n📝 Please provide the following required values:\n');

  // Required environment variables
  const requiredVars = [
    {
      key: 'JWT_SECRET',
      description: 'JWT secret key for admin authentication',
      default: 'zatonafoushware-super-secret-jwt-key-2024-production-ready',
    },
    {
      key: 'ADMIN_PORT',
      description: 'Port for admin server',
      default: '3001',
    },
    {
      key: 'WEB_PORT',
      description: 'Port for web server',
      default: '3000',
    },
    {
      key: 'ADMIN_URL',
      description: 'Admin server URL',
      default: 'http://localhost:3001',
    },
    {
      key: 'WEB_URL',
      description: 'Web server URL',
      default: 'http://localhost:3000',
    },
    {
      key: 'NEXT_PUBLIC_WEB_URL',
      description: 'Public web URL',
      default: 'http://localhost:3000',
    },
    {
      key: 'ADMIN_API_BASE_URL',
      description: 'Admin API base URL',
      default: 'http://localhost:3001/api',
    },
    {
      key: 'INITIAL_ADMIN_EMAIL',
      description: 'Initial admin email',
      default: 'afouadsoftwareengineer@gmail.com',
    },
    {
      key: 'INITIAL_ADMIN_PASSWORD',
      description: 'Initial admin password',
      default: 'zatonafoushware$8888',
    },
    {
      key: 'INITIAL_ADMIN_NAME',
      description: 'Initial admin name',
      default: 'Ahmed Fouad',
    },
  ];

  let envContent = fs.readFileSync(envPath, 'utf8');

  for (const variable of requiredVars) {
    const value = await question(
      `${variable.description} (${variable.key}) [${variable.default}]: `
    );
    const finalValue = value.trim() || variable.default;

    // Replace the value in the .env file
    const regex = new RegExp(`^${variable.key}=.*$`, 'm');
    envContent = envContent.replace(regex, `${variable.key}=${finalValue}`);
  }

  // Write the updated .env file
  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ Environment setup complete!');
  console.log('📁 .env file created with your configuration.');
  console.log('\n🚀 You can now start the development server with:');
  console.log('   npm run dev');

  rl.close();
}

setupEnvironment().catch(console.error);
