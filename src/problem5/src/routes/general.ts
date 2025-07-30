import { Router } from "express";
import { aboutController } from "../controllers/about";
import { healthcheckController } from "../controllers/healthcheck";

const router = Router();

/**
 * @swagger
 * /about:
 *  get:
 *    tags:
 *      - About
 *    summary: Get metadata about the server
 *    description: |
 *      This endpoint returns these information about the server:
 *        - **name**: The server name
 *        - **version**: The current version of the server
 *        - **build**: The build number of the server
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                version:
 *                  type: string
 *                build:
 *                  type: string
 */
router.get("/about", aboutController);

/**
 * @swagger
 * /healthcheck:
 *  get:
 *    tags:
 *      - About
 *    summary: The health check endpoint
 *    description: Check if the server is running
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.get("/healthcheck", healthcheckController);

export default router;
