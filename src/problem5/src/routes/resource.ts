import { Router } from "express";
import {
  IdValidator,
  createResourceValidator,
  updateResourceValidator,
  listResourcesValidator,
} from "../validators/resource";
import {
  getResourceController,
  createResourceController,
  updateResourceController,
  deleteResourceController,
  listResourcesController,
} from "../controllers/resource";

const router = Router();

/**
 * @swagger
 * /resource/{id}:
 *  get:
 *    tags:
 *      - Resource
 *    summary: Get details of a resource via ID
 *    description: |
 *      Send a request to get details of a resource via ID.
 *
 *      This endpoint returns these attributes:
 *        - **id**: The id of the resource
 *        - **name**: The name of the resource
 *        - **description**: The description of the resource
 *        - **createdAt**: The timestamp that the resource was created
 *        - **updatedAt**: The latest timestamp that the resource was updated
 *        - **status**: The current status of the resource
 *        - **value1**: The value of `value1`
 *        - **value2**: The value of `value2`
 *        - **value3**: The value of `value3`
 *        - **value4**: The value of `value4`
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                status:
 *                  type: string
 *                value1:
 *                  type: string
 *                  nullable: true
 *                value2:
 *                  type: boolean
 *                  nullable: true
 *                value3:
 *                  type: integer
 *                  nullable: true
 *                value4:
 *                  type: number
 *                  nullable: true
 *      400:
 *        description: Invalid ID
 *      404:
 *        description: Resource not found
 */
router.get("/resource/:id", IdValidator, getResourceController);

/**
 * @swagger
 * /resource:
 *   post:
 *     tags:
 *       - Resource
 *     summary: Create a new resource
 *     description: |
 *       Send request to create a new resource.
 *         - **name**: Required, the name of the resource
 *         - **description**: Optional, the description of the resource
 *         - **value1**: Optional, the value of `value1`
 *         - **value2**: Optional, the value of `value2`
 *         - **value3**: Optional, the value of `value3`
 *         - **value4**: Optional, the value of `value4`
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               value1:
 *                 type: string
 *                 nullable: true
 *               value2:
 *                 type: boolean
 *                 nullable: true
 *               value3:
 *                 type: integer
 *                 nullable: true
 *               value4:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Resource created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                 value1:
 *                   type: string
 *                   nullable: true
 *                 value2:
 *                   type: boolean
 *                   nullable: true
 *                 value3:
 *                   type: integer
 *                   nullable: true
 *                 value4:
 *                   type: number
 *                   nullable: true
 *       400:
 *         description: Invalid input
 */
router.post("/resource", createResourceValidator, createResourceController);

/**
 * @swagger
 * /resource/{id}:
 *   put:
 *     tags:
 *       - Resource
 *     summary: Update resource details
 *     description: |
 *       Send request to update details of an existing resource
 *         - **id**: Required, the id of the resource that you want to update
 *         - **name**: Optional, the new name of the resource that you want to update
 *         - **description**: Optional, the new description that you want to update
 *         - **value1**: Optional, the new value of value1 that you want to update
 *         - **value2**: Optional, the new value of value2 that you want to update
 *         - **value3**: Optional, the new value of value3 that you want to update
 *         - **value4**: Optional, the new value of value4 that you want to update
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 nullable: true
 *               description:
 *                 type: string
 *                 nullable: true
 *               value1:
 *                 type: string
 *                 nullable: true
 *               value2:
 *                 type: boolean
 *                 nullable: true
 *               value3:
 *                 type: integer
 *                 nullable: true
 *               value4:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Resource updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                 value1:
 *                   type: string
 *                   nullable: true
 *                 value2:
 *                   type: boolean
 *                   nullable: true
 *                 value3:
 *                   type: integer
 *                   nullable: true
 *                 value4:
 *                   type: number
 *                   nullable: true
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Resource not found
 */
router.put("/resource/:id", IdValidator, updateResourceValidator, updateResourceController);

/**
 * @swagger
 * /resource/{id}:
 *   delete:
 *     tags:
 *       - Resource
 *     summary: Delete a resource via ID
 *     description: |
 *       Send request to delete an existing resource via ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Resource not found
 */
router.delete("/resource/:id", IdValidator, deleteResourceController);

/**
 * @swagger
 * /resources:
 *   get:
 *     tags:
 *       - Resource
 *     summary: List resources with filters
 *     description: |
 *       Send request to get list of resources with filters
 *         - **name**: Required, the partial name of resources you want to find.
 *             Any resource that the name contains this value will be returned.
 *         - **page**: Optional, defaults to 1. The result page order that
 *             the server will return.
 *         - **limit**: Optional, defaults to 10. The number of results per page
 *             that the server will return.
 *
 *       This endpoints will return these attributes:
 *         - **page**: The page order you set
 *         - **limit**: The limit number you set
 *         - **resources**: An array of objects that contains these attributes:
 *           - **id**: The id of the resource
 *           - **name**: The name of the resource
 *           - **description**: The description of the resource
 *           - **createdAt**: The timestamp that the resource was created
 *           - **updatedAt**: The latest timestamp that the resource was updated
 *           - **status**: The current status of the resource
 *           - **value1**: The value of `value1`
 *           - **value2**: The value of `value2`
 *           - **value3**: The value of `value3`
 *           - **value4**: The value of `value4`
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 resources:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       value1:
 *                         type: string
 *                         nullable: true
 *                       value2:
 *                         type: boolean
 *                         nullable: true
 *                       value3:
 *                         type: integer
 *                         nullable: true
 *                       value4:
 *                         type: number
 *                         nullable: true
 *       400:
 *         description: Invalid query parameters
 */
router.get("/resources", listResourcesValidator, listResourcesController);

export default router;
