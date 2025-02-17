import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { findRefreshTokenById } from "src/api/auth/auth.services";
dotenv.config();

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the token from the cookie
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // Verify the token using the correct JWT_REFRESH_SECRET
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      userId: number;
      jti: string;
    };

    // Check if token exists in whitelist and is not revoked
    const savedToken = await findRefreshTokenById(decoded.jti);
    if (!savedToken || savedToken.revoked) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Attach the user to the request object
    req.user = {
      userId: decoded.userId,
    };

    // Call the next middleware
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default requireAuth;
