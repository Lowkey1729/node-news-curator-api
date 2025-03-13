import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

export const validate = (rules: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = rules.safeParse(req.body)

    if (!success) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'One or more validation errors occurred',
        data: error
      })
    }

    return next()
  }
}
