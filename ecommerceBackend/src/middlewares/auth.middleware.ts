import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";


export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiErrorHandler({ statusCode: 401, errors: ["Unauthorized request"], message: "Unauthorized request" });
    }

    try {
        const tokenInfo = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRETE)) as JwtPayload;
        // console.log("user information", tokenInfo);

        if (!tokenInfo || !tokenInfo.id || !tokenInfo.email) {
            throw new ApiErrorHandler({
                statusCode: 401,
                errors: ["Invalid User"],
                message: "Invalid User"
            });
        }

        // Attach user info to req
        req.user = {
            id: tokenInfo.id,
            email: tokenInfo.email
        };

        next();
    } catch (err) {
        console.log(err);
        throw new ApiErrorHandler({
            statusCode: 401,
            errors: [],
            message: "Authentication failed. Please log in again."
        });
    }
});
