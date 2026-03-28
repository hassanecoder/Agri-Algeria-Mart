import { Router, type IRouter } from "express";
import { db, productsTable, categoriesTable, sellersTable, wilayasTable } from "@workspace/db";
import { eq, like, and, gte, lte, sql, type SQL } from "drizzle-orm";

const router: IRouter = Router();

router.get("/products", async (req, res) => {
  try {
    const { categoryId, wilayaId, minPrice, maxPrice, search, featured, limit = "20", offset = "0" } = req.query as Record<string, string>;

    const conditions: SQL[] = [];

    if (categoryId) conditions.push(eq(productsTable.categoryId, categoryId));
    if (wilayaId) conditions.push(eq(productsTable.wilayaId, wilayaId));
    if (minPrice) conditions.push(gte(productsTable.price, minPrice));
    if (maxPrice) conditions.push(lte(productsTable.price, maxPrice));
    if (search) conditions.push(like(productsTable.name, `%${search}%`));
    if (featured === "true") conditions.push(eq(productsTable.featured, true));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        nameAr: productsTable.nameAr,
        description: productsTable.description,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        sellerId: productsTable.sellerId,
        sellerName: sellersTable.name,
        wilayaId: productsTable.wilayaId,
        wilayaName: wilayasTable.name,
        price: productsTable.price,
        unit: productsTable.unit,
        minOrder: productsTable.minOrder,
        stock: productsTable.stock,
        images: productsTable.images,
        featured: productsTable.featured,
        organic: productsTable.organic,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        tags: productsTable.tags,
        createdAt: productsTable.createdAt,
      })
      .from(productsTable)
      .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .leftJoin(sellersTable, eq(productsTable.sellerId, sellersTable.id))
      .leftJoin(wilayasTable, eq(productsTable.wilayaId, wilayasTable.id))
      .where(whereClause)
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable)
      .where(whereClause);

    res.json({
      products: products.map(p => ({
        ...p,
        price: parseFloat(p.price as string),
        minOrder: parseFloat(p.minOrder as string),
        stock: parseFloat(p.stock as string),
        rating: parseFloat(p.rating as string),
        createdAt: p.createdAt?.toISOString(),
      })),
      total: Number(count),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        nameAr: productsTable.nameAr,
        description: productsTable.description,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        sellerId: productsTable.sellerId,
        sellerName: sellersTable.name,
        wilayaId: productsTable.wilayaId,
        wilayaName: wilayasTable.name,
        price: productsTable.price,
        unit: productsTable.unit,
        minOrder: productsTable.minOrder,
        stock: productsTable.stock,
        images: productsTable.images,
        featured: productsTable.featured,
        organic: productsTable.organic,
        rating: productsTable.rating,
        reviewCount: productsTable.reviewCount,
        tags: productsTable.tags,
        createdAt: productsTable.createdAt,
      })
      .from(productsTable)
      .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .leftJoin(sellersTable, eq(productsTable.sellerId, sellersTable.id))
      .leftJoin(wilayasTable, eq(productsTable.wilayaId, wilayasTable.id))
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({
      ...product,
      price: parseFloat(product.price as string),
      minOrder: parseFloat(product.minOrder as string),
      stock: parseFloat(product.stock as string),
      rating: parseFloat(product.rating as string),
      createdAt: product.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const body = req.body;
    const id = `prod-${Date.now()}`;
    const [product] = await db
      .insert(productsTable)
      .values({ id, ...body })
      .returning();
    res.status(201).json(product);
  } catch (err) {
    req.log.error({ err }, "Error creating product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
