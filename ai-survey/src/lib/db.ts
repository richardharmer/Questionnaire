import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

export const surveys = pgTable('surveys', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  experience: text('experience').notNull(),
  currentTools: text('current_tools').notNull(),
  primaryTool: text('primary_tool').notNull(),
  satisfaction: text('satisfaction').notNull(),
  features: text('features').notNull(),
  challenges: text('challenges').notNull(),
  recommendation: text('recommendation').notNull(),
  futureInterest: text('future_interest').notNull(),
  additionalComments: text('additional_comments'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Survey = typeof surveys.$inferInsert;