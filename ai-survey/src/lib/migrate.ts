import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// 加载环境变量
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

export async function createTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS surveys (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        experience TEXT NOT NULL,
        current_tools TEXT NOT NULL,
        primary_tool TEXT NOT NULL,
        satisfaction TEXT NOT NULL,
        features TEXT NOT NULL,
        challenges TEXT NOT NULL,
        recommendation TEXT NOT NULL,
        future_interest TEXT NOT NULL,
        additional_comments TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}