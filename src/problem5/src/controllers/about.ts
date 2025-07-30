import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { metadata } from "../configs/metadata";

/**
 * About controller
 *
 * Return the metadata of the server. E.g. version, build, server name...
 * @param req
 * @param res
 */
export const aboutController = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(metadata);
};
