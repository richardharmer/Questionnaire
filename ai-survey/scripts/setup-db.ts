import { config } from 'dotenv';
import { createTables } from '../src/lib/migrate';

// 加载环境变量
config({ path: '.env.local' });

async function setup() {
  try {
    console.log('Setting up database...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'Not found');
    await createTables();
    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setup();