export class AppError extends Error {
  public statusCode: number
  public methodName?: string

  constructor(message: string, statusCode: number, methodName?: string) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.methodName = methodName

    Error.captureStackTrace(this, this.constructor)
  }
}
