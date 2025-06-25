import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

type AsyncController =  (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

const catchErrors = (controllers: AsyncController): AsyncController => 
    async (req, res, next) => {
        try {
            await controllers(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    export default catchErrors;