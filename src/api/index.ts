import express from "express";
import { authRouter } from "./auth/auth.routes";
import { usersRouter } from "./users/users.routes";

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

export { apiRouter };
