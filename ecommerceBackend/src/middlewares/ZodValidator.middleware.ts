import { ZodError, ZodSchema } from "zod";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import { Response, Request, NextFunction } from "express";

function ZodValidator(schema: ZodSchema) {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const parsedReq = await schema.parseAsync(body);
            req.body = parsedReq;
            next()
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const validationError = error.errors.map(err => err.message);
                return next(
                    new ApiErrorHandler({
                        statusCode: 400,
                        errors: validationError,
                        message: "Validation Failed."
                    })
                )
            }
            next(error);
        }
    }
}


export default ZodValidator