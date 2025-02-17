import express, { NextFunction, Request, Response } from "express";
import { db } from "../../db";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const data = await db.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.status(200).json(data);
});

export { router as usersRouter };
