import { Response } from "express";
import { createHash } from "crypto";
import { db } from "../../db";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret;

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: number, jti: string) => {
  return jwt.sign({ userId, jti }, JWT_REFRESH_SECRET, {
    expiresIn: "8h",
  });
};

export const generateTokens = (userId: number, jti: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, jti);
  return { accessToken, refreshToken };
};

export const hashToken = (token: string) => {
  return createHash("sha512").update(token).digest("hex");
};

export const userExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user !== null;
};

export const addRefreshTokenToWhiteList = async ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: number;
}) => {
  await db.refreshToken.create({
    data: { id: jti, hashedToken: hashToken(refreshToken), userId },
  });
};

export const findRefreshTokenById = async (id: string) => {
  return await db.refreshToken.findUnique({
    where: { id },
  });
};

export const deleteRefreshToken = async (id: string) => {
  await db.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
};

export const revokeTokens = (userId: number) => {};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};
