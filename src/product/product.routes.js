import { Router } from "express";
import {addProduct,ProductCategory,listProduct,updateProduct,inventarioProduct,ventasProduct,deleteProduct,updateByProduct,listarProductosEstado} from "./product.controller.js";
import { addProductValidator, productCategoryValidator , listProductValidator ,updateProductValidator,inventoryProductValidator,ventasProductValidator,deleteProductValidator,updateByProductValidator} from "../middlewares/validate-product.js";

const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               existencias:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error adding product
 */
router.post("/", addProductValidator, addProduct);

/**
 * @swagger
 * /products/productproducto/{name}:
 *   get:
 *     summary: Get products by name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Product name
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       500:
 *         description: Error retrieving products
 */
router.get("/productproducto/:name", productCategoryValidator, ProductCategory);

/**
 * @swagger
 * /products/listProduct:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products listed successfully
 *       500:
 *         description: Error listing products
 */
router.get("/listProduct", listProductValidator, listProduct);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               existencias:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct);

/**
 * @swagger
 * /products/listarPorExistencias:
 *   get:
 *     summary: List products by availability
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products listed by availability successfully
 *       500:
 *         description: Error listing products by availability
 */
router.get("/listarPorExistencias", listarProductosEstado);

/**
 * @swagger
 * /products/ventasProduct:
 *   get:
 *     summary: List top selling products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Top selling products listed successfully
 *       404:
 *         description: No products sold yet
 *       500:
 *         description: Error listing top selling products
 */
router.get("/ventasProduct", ventasProductValidator, ventasProduct);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /products/updateByProduct/{id}:
 *   patch:
 *     summary: Update a single field of a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Only one field can be updated at a time
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.patch("/updateByProduct/:id", updateByProductValidator, updateByProduct);

router.post("/inventarioProduct", inventoryProductValidator,inventarioProduct);


export default router;