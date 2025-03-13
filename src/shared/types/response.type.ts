import { Response } from 'express'

export type ServiceResponse = {
  success: boolean
  message: string
  data?: any,
  error?: any
}

export type RDM = {
  res: Response
  data?: ServiceResponse | []
  statusCode?: number
}
