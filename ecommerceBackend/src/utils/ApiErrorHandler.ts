import { ApiErrorType } from "./Types";


class ApiErrorHandler extends Error{
    statusCode:number
    success:boolean
    errors:string[]
    constructor({statusCode,message="Something Went Wrong",errors}:ApiErrorType){
        super(message);
        this.statusCode=statusCode|| 500;
        this.success=false;
        this.errors=errors || [];

        Error.captureStackTrace(this,this.constructor)
    }
}

export default ApiErrorHandler;