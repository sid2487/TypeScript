import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log(`PATH: ${req.path}`, error);
  const statusCode = (error as any).statusCode || 500;

  console.error("🔥 ERROR:", error.message);

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    path: req.path,
  });
};


export default errorHandler;
