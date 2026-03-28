import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import sellersRouter from "./sellers";
import wilayasRouter from "./wilayas";
import marketPricesRouter from "./marketPrices";
import messagesRouter from "./messages";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(sellersRouter);
router.use(wilayasRouter);
router.use(marketPricesRouter);
router.use(messagesRouter);

export default router;
