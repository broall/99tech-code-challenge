import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Healthcheck controller
 * @param req
 * @param res
 */
export const healthcheckController = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "OK" });
};
