

import {Request,Response,NextFunction} from "express"

const asyncHandler=(requestHandler:(req:Request,res:Response,next:NextFunction)=>Promise<unknown>)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await requestHandler(req,res,next)
        }catch(err:unknown){
            // return res.status(err.code).json({
            //     success:false,
            //     message:err.message
            // })
            next(err)
        }
    }
}

export default asyncHandler;