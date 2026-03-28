import { Router, type IRouter } from "express";
import { db, messagesTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/messages", async (req, res) => {
  try {
    const { senderName, senderEmail, senderPhone, subject, body, recipientSellerId } = req.body;

    if (!senderName || !senderEmail || !subject || !body) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const id = `msg-${Date.now()}`;
    const [message] = await db
      .insert(messagesTable)
      .values({ id, senderName, senderEmail, senderPhone, subject, body, recipientSellerId })
      .returning();

    res.status(201).json({
      ...message,
      createdAt: message.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error sending message");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
