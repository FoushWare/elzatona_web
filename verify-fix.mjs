
import { createRepositoryFactoryFromEnv } from './libs/database/src/repositories/RepositoryFactory.ts';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verifyFix() {
    console.log('Verifying findAdminByEmail fix...');

    try {
        const factory = createRepositoryFactoryFromEnv();
        const userRepo = factory.getUserRepository();

        const email = 'elzatonafoushware@gmail.com';
        console.log(`Searching for admin: ${email}...`);

        const admin = await userRepo.findAdminByEmail(email);

        if (admin) {
            console.log('✅ FIX VERIFIED! Admin found:');
            console.log({
                id: admin.id,
                email: admin.email,
                role: admin.role,
                isActive: admin.isActive
            });
        } else {
            console.error('❌ FIX FAILED: Admin not found.');
            process.exit(1);
        }
    } catch (err) {
        console.error('💥 Unexpected error during verification:', err);
        process.exit(1);
    }
}

verifyFix();
