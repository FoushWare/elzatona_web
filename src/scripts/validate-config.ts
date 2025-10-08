import { validateAdminConfig } from '../../admin.config';

/**
 * Configuration Validation Script
 *
 * This script validates that all required environment variables are set.
 * Run this before starting the application to ensure proper configuration.
 *
 * Usage: npx tsx src/scripts/validate-config.ts
 */

async function validateConfiguration() {
  console.log('🔍 Validating Configuration...\n');

  try {
    validateAdminConfig();
    console.log('✅ All required environment variables are set!');
    console.log('');
    console.log('📋 Configuration Summary:');
    console.log(`   Admin Port: ${process.env.ADMIN_PORT}`);
    console.log(`   Web Port: ${process.env.WEB_PORT}`);
    console.log(`   Admin URL: ${process.env.ADMIN_URL}`);
    console.log(`   Web URL: ${process.env.WEB_URL}`);
    console.log(`   API Base URL: ${process.env.ADMIN_API_BASE_URL}`);
    console.log(
      `   JWT Secret: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`
    );
    console.log('');
    console.log('🚀 Configuration is ready for production!');
  } catch (error) {
    console.error('❌ Configuration validation failed:');
    console.error(error);
    console.error('');
    console.error(
      '📝 Please check your .env file and ensure all required variables are set.'
    );
    console.error(
      '   See env.example for a complete list of required variables.'
    );
    process.exit(1);
  }
}

// Run the validation
validateConfiguration();
