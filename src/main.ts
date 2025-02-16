import express from "express";
import { apiRouter } from "./api";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", apiRouter);

app.listen(process.env.PORT, () =>
  console.log(`listening on http://localhost:${process.env.PORT}`)
);
