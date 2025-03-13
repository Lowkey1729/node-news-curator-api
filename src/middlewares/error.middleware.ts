import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { AppError } from '@app/shared/errors'
import {logger} from "@app/config/logger.config";

export function setErrorHandler(error: any, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(error)
  }

  const code = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
  const name = error.name
  const errName = !name || name === 'Error' ? 'INTERNAL SERVER ERROR' : name
  const message =
    error instanceof AppError
      ? error.message
      : 'We are unable to process your request. please try again later or contact support'

  logger.error(
    {
      err: error,
      message,
      url: req.originalUrl,
      errResp: error?.response?.data ?? 'N/A',
      body: Object.keys(req.body).length > 0 ? req.body : 'N/A'
    },
    errName
  )

  res.status(code).json({
    success: false,
    message
  })
}
