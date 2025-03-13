import { StatusCodes } from 'http-status-codes'
import { RDM } from '../types'

export const successResponse = ({ res, data = [], statusCode = StatusCodes.OK }: RDM) => {
  return res.status(statusCode).json(data)
}
