import { param, body, query } from "express-validator";

export const IdValidator = [
  param("id").isInt({ min: 0 }).withMessage("ID must be non-negative integer!"),
];

export const createResourceValidator = [
  body("name").isString().notEmpty().withMessage("Name is required and must be string"),
  body("description")
    .optional({ nullable: true })
    .isString()
    .withMessage("Description must be string"),
  body("value1").optional({ nullable: true }).isString().withMessage("Value1 must be a string"),
  body("value2").optional({ nullable: true }).isBoolean().withMessage("Value2 must be a boolean"),
  body("value3").optional({ nullable: true }).isInt().withMessage("Value3 must be an integer"),
  body("value4").optional({ nullable: true }).isFloat().withMessage("Value4 must be a number"),
];

export const updateResourceValidator = [
  body("name").optional().isString().notEmpty().withMessage("Name must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("value1").optional({ nullable: true }).isString().withMessage("Value1 must be a string"),
  body("value2").optional({ nullable: true }).isBoolean().withMessage("Value2 must be a boolean"),
  body("value3").optional({ nullable: true }).isInt().withMessage("Value3 must be an integer"),
  body("value4").optional({ nullable: true }).isFloat().withMessage("Value4 must be a number"),
];

export const listResourcesValidator = [
  query("name").optional().isString().withMessage("Name must be a string"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .toInt()
    .withMessage("Page must be a positive integer")
    .default(1),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
    .withMessage("Limit must be an integer between 1 and 100")
    .default(10),
];
