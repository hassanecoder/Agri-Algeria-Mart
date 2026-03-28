import { pgTable, text, numeric, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id").notNull(),
  sellerId: text("seller_id").notNull(),
  wilayaId: text("wilaya_id").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  minOrder: numeric("min_order", { precision: 10, scale: 2 }).notNull().default("1"),
  stock: numeric("stock", { precision: 10, scale: 2 }).notNull().default("0"),
  images: text("images").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  organic: boolean("organic").notNull().default(false),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
