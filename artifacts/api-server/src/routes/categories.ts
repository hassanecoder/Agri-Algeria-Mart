import { Router, type IRouter } from "express";
import { db, categoriesTable, productsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/categories", async (req, res) => {
  try {
    const cats = await db.select().from(categoriesTable);
    
    const withCounts = await Promise.all(
      cats.map(async (cat) => {
        const [{ count }] = await db
          .select({ count: sql<number>`count(*)` })
          .from(productsTable)
          .where(eq(productsTable.categoryId, cat.id));
        return { ...cat, productCount: Number(count) };
      })
    );

    res.json({ categories: withCounts });
  } catch (err) {
    req.log.error({ err }, "Error fetching categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
