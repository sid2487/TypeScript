import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = (error as any).statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
        path: req.path,
    })
}

export default  errorHandler;