import { StatusCodes } from "http-status-codes";

import { AppError } from "./app.error";

export class NotFoundError extends AppError {
  constructor(message: string, methodName?: string) {
    super(message, StatusCodes.NOT_FOUND, methodName);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, methodName?: string) {
    super(message, StatusCodes.CONFLICT, methodName);
  }
}

export class UnAuthorizedError extends AppError {
  constructor(message: string, methodName?: string) {
    super(message, StatusCodes.UNAUTHORIZED, methodName);
  }
}

export class ValidatorError extends AppError {
  constructor(message: string, methodName?: string) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, methodName);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, methodName?: string) {
    super(message, StatusCodes.BAD_REQUEST, methodName);
  }
}
