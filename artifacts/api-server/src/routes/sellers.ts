import { Router, type IRouter } from "express";
import { db, sellersTable, wilayasTable, productsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/sellers", async (req, res) => {
  try {
    const sellers = await db
      .select({
        id: sellersTable.id,
        name: sellersTable.name,
        wilayaId: sellersTable.wilayaId,
        wilayaName: wilayasTable.name,
        phone: sellersTable.phone,
        bio: sellersTable.bio,
        rating: sellersTable.rating,
        reviewCount: sellersTable.reviewCount,
        productCount: sellersTable.productCount,
        joinedAt: sellersTable.joinedAt,
        verified: sellersTable.verified,
        profileImage: sellersTable.profileImage,
      })
      .from(sellersTable)
      .leftJoin(wilayasTable, eq(sellersTable.wilayaId, wilayasTable.id));

    res.json({
      sellers: sellers.map(s => ({
        ...s,
        rating: parseFloat(s.rating as string),
        joinedAt: s.joinedAt?.toISOString(),
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching sellers");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [seller] = await db
      .select({
        id: sellersTable.id,
        name: sellersTable.name,
        wilayaId: sellersTable.wilayaId,
        wilayaName: wilayasTable.name,
        phone: sellersTable.phone,
        bio: sellersTable.bio,
        rating: sellersTable.rating,
        reviewCount: sellersTable.reviewCount,
        productCount: sellersTable.productCount,
        joinedAt: sellersTable.joinedAt,
        verified: sellersTable.verified,
        profileImage: sellersTable.profileImage,
      })
      .from(sellersTable)
      .leftJoin(wilayasTable, eq(sellersTable.wilayaId, wilayasTable.id))
      .where(eq(sellersTable.id, id));

    if (!seller) {
      res.status(404).json({ error: "Seller not found" });
      return;
    }

    res.json({
      ...seller,
      rating: parseFloat(seller.rating as string),
      joinedAt: seller.joinedAt?.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching seller");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
