import { Router, type IRouter } from "express";
import { db, marketPricesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/market-prices", async (req, res) => {
  try {
    const prices = await db
      .select()
      .from(marketPricesTable)
      .orderBy(desc(marketPricesTable.updatedAt));

    res.json({
      prices: prices.map(p => ({
        ...p,
        priceMin: parseFloat(p.priceMin as string),
        priceMax: parseFloat(p.priceMax as string),
        changePercent: parseFloat(p.changePercent as string),
        updatedAt: p.updatedAt?.toISOString(),
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching market prices");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
