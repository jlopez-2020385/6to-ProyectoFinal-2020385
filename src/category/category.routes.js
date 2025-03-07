import { Router } from "express";
import {crearCategoria,editarCategoria,eliminarCategoria} from "./category.controller.js";
import {createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} from "../middlewares/validator-cateagory.js";

const router = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 *       500:
 *         description: Error creating category
 */
router.post("/", createCategoryValidator, crearCategoria);

/**
 * @swagger
 * /categoryUpdate/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Category with this name already exists
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 */
router.put("/categoryUpdate/:id", updateCategoryValidator, editarCategoria);

/**
 * @swagger
 * /categoryDelete/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/categoryDelete/:id", deleteCategoryValidator, eliminarCategoria);

export default router;
