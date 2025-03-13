import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const validate = (rules: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = rules.safeParse(req.body);

    if (success) {
      return next();
    }

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: "One or more validation errors occurred",
      errors: error,
    });
  };
};
