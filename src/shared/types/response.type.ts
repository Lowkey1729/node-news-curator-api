import { Response } from "express";

export type ServiceResponse<T = unknown, E = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: E;
};

export type RDM = {
  res: Response;
  data?: ServiceResponse | [];
  statusCode?: number;
};
