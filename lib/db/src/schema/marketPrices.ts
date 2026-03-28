import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marketPricesTable = pgTable("market_prices", {
  id: text("id").primaryKey(),
  productName: text("product_name").notNull(),
  productNameAr: text("product_name_ar").notNull(),
  categoryName: text("category_name").notNull(),
  priceMin: numeric("price_min", { precision: 10, scale: 2 }).notNull(),
  priceMax: numeric("price_max", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  trend: text("trend").notNull().default("stable"),
  changePercent: numeric("change_percent", { precision: 5, scale: 2 }).notNull().default("0"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  wilayaName: text("wilaya_name").notNull(),
});

export const insertMarketPriceSchema = createInsertSchema(marketPricesTable);
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;
export type MarketPrice = typeof marketPricesTable.$inferSelect;
