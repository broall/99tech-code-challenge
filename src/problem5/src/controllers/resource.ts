import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Resource } from "../entities/resource";
import { AppDataSource } from "../db/datasource";
import { StatusEnum } from "../enums/status";

interface IIdParams {
  id: number;
}

interface ICreateResourceBody {
  name: string | null;
  description?: string | null;
  value1?: string | null;
  value2?: boolean | null;
  value3?: number | null;
  value4?: number | null;
}

interface IListResourcesQuery {
  name?: string;
  page: number;
  limit: number;
}

/**
 * Get resource controller
 *
 * Return details of a resource via ID
 * @param req
 * @param res
 * @returns
 */
export const getResourceController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors.array(),
    });
    return;
  }

  const data: IIdParams = matchedData(req);
  const resourceId = data.id;

  try {
    const resourceRepository = AppDataSource.getRepository(Resource);
    const resource = await resourceRepository.findOneBy({
      id: resourceId,
      status: StatusEnum.Active,
    });

    if (!resource) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Resource not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json(resource);
  } catch (error) {
    console.error("Error while fetching data from database", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal error occurred! Please try again later or contact admin for support!",
    });
  }
};

/**
 * Create new resource controller
 *
 * Create new resource and save it in database
 * @param req
 * @param res
 * @returns
 */
export const createResourceController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors.array(),
    });
    return;
  }

  const data: ICreateResourceBody = matchedData(req);

  try {
    const resourceRepository = AppDataSource.getRepository(Resource);
    const resource = resourceRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: StatusEnum.Active,
    } as Resource);

    const savedResource = await resourceRepository.save(resource);
    res.status(StatusCodes.CREATED).json(savedResource);
  } catch (error) {
    console.error("Error while saving data to database", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal error occurred! Please try again later or contact admin for support!",
    });
  }
};

/**
 * Update resource controller
 *
 * Update details of an existing resource
 * @param req
 * @param res
 * @returns
 */
export const updateResourceController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const data: IIdParams & ICreateResourceBody = matchedData(req);
  const resourceId = data.id;

  try {
    const resourceRepository = AppDataSource.getRepository(Resource);
    const resource = await resourceRepository.findOneBy({
      id: resourceId,
      status: StatusEnum.Active,
    });

    if (!resource) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Resource not found" });
      return;
    }

    resource.name = data.name ?? resource.name;
    resource.description = data.description ?? resource.description;
    resource.value1 = data.value1 ?? resource.value1;
    resource.value2 = data.value2 ?? resource.value2;
    resource.value3 = data.value3 ?? resource.value3;
    resource.value4 = data.value4 ?? resource.value4;
    resource.updatedAt = new Date();

    const updatedResource = await resourceRepository.save(resource);
    res.status(StatusCodes.OK).json(updatedResource);
  } catch (error) {
    console.error("Error while saving data to database", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal error occurred! Please try again later or contact admin for support!",
    });
  }
};

/**
 * Delete resource controller
 *
 * Delete an existing resource via ID. Note that this controller will perform "soft" deletion,
 * meaning that it will change the status, it doesn't actually delete any record in database.
 * @param req
 * @param res
 * @returns
 */
export const deleteResourceController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const data: IIdParams = matchedData(req);
  const resourceId = data.id;

  try {
    const resourceRepository = AppDataSource.getRepository(Resource);
    const resource = await resourceRepository.findOneBy({
      id: resourceId,
      status: StatusEnum.Active,
    });

    if (!resource) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Resource not found" });
      return;
    }

    resource.status = StatusEnum.Deleted;
    resource.updatedAt = new Date();

    await resourceRepository.save(resource);
    res.status(StatusCodes.NO_CONTENT).json({ message: "Deleted resource successfully" });
  } catch (error) {
    console.error("Error while deleting data from database", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal error occurred! Please try again later or contact admin for support!",
    });
  }
};

/**
 * List resources controller
 *
 * List details of resouces with basic filters
 * @param req
 * @param res
 * @returns
 */
export const listResourcesController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  const data: IListResourcesQuery = matchedData(req);
  const name = data.name ?? "";
  const page = data.page ?? 1;
  const limit = data.limit ?? 10;

  try {
    const resourceRepository = AppDataSource.getRepository(Resource);
    const query = resourceRepository.createQueryBuilder("resource");

    query.andWhere("resource.status = :status", { status: StatusEnum.Active });

    if (name) {
      query.andWhere("resource.name LIKE :name", { name: `%${name}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    const resources = await query.getMany();
    res.status(StatusCodes.OK).json({
      page,
      limit,
      resources,
    });
  } catch (error) {
    console.error("Error while getting data from database", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal error occurred! Please try again later or contact admin for support!",
    });
  }
};
