import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"
import { productExists , categoryProduct} from "../helpers/db-validators.js";


export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("precio").notEmpty().withMessage("El precio es requerido").isNumeric().withMessage("El precio debe ser un número"),
    body("categoria").notEmpty().withMessage("El producto es requerido"),
    body("existencias").notEmpty().withMessage("Las existencias son requeridas").isInt({ min: 0 }).withMessage("Las existencias deben ser un número entero positivo"),
    body("nombre").custom(productExists),
    body("categoria").custom(categoryProduct),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const productCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("name").notEmpty().withMessage("El nombre del producto es requerido"), 
    validarCampos,
    handleErrors
];

export const listProductValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombre").optional().notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").optional().notEmpty().withMessage("La descripción es requerida"),
    body("precio").optional().notEmpty().withMessage("El precio es requerido").isNumeric().withMessage("El precio debe ser un número"),
    body("categoria").optional().isMongoId().withMessage("El ID de la categoría debe ser un ID válido de MongoDB"),
    body("existencias").optional().notEmpty().withMessage("Las existencias son requeridas").isInt({ min: 0 }).withMessage("Las existencias deben ser un número entero positivo"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const inventoryProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const ventasProductValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const updateByProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombre").optional().notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").optional().notEmpty().withMessage("La descripción es requerida"),
    body("precio").optional().notEmpty().withMessage("El precio es requerido").isNumeric().withMessage("El precio debe ser un número"),
    body("producto").optional().notEmpty().withMessage("El producto es requerido"),
    body("existencias").optional().notEmpty().withMessage("Las existencias son requeridas").isInt({ min: 0 }).withMessage("Las existencias deben ser un número entero positivo"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];