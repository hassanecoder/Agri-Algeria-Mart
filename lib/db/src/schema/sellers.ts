import { pgTable, text, numeric, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sellersTable = pgTable("sellers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  wilayaId: text("wilaya_id").notNull(),
  phone: text("phone").notNull(),
  bio: text("bio").notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  productCount: integer("product_count").notNull().default(0),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  verified: boolean("verified").notNull().default(false),
  profileImage: text("profile_image"),
});

export const insertSellerSchema = createInsertSchema(sellersTable);
export type InsertSeller = z.infer<typeof insertSellerSchema>;
export type Seller = typeof sellersTable.$inferSelect;
