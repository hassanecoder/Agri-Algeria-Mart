import { Router, type IRouter } from "express";
import { db, wilayasTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/wilayas", async (req, res) => {
  try {
    const wilayas = await db.select().from(wilayasTable).orderBy(asc(wilayasTable.code));
    res.json({ wilayas });
  } catch (err) {
    req.log.error({ err }, "Error fetching wilayas");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
