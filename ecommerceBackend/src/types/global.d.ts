import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: number;
                email: string;
            };
            files:{
                mainImage?: Express.Multer.File[];
                image1?: Express.Multer.File[];
                image2?: Express.Multer.File[];
                image3?: Express.Multer.File[];
            }
        }
    }
}
