import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
            files:{
                thumbNailImage?: Express.Multer.File[];
                images?: Express.Multer.File[];
                // image2?: Express.Multer.File[];
                // image3?: Express.Multer.File[];
            }
        }
    }
}
