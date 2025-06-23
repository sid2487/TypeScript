import { NextFunction, Request, Response } from "express";

const catchErrors = (controller: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
           await controller(req, res, next);
        } catch (error) {
            next(error)
        }
    };


    export default catchErrors;