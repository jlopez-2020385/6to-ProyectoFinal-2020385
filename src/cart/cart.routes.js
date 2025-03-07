import { Router } from "express";
import { agregarAlCarrito, eliminarProductoCarrito, listarrCarritoUser } from "./cart.controller.js";

const router = Router();

/**
 * @swagger
 * /cart/agregar:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 description: User ID
 *               productoId:
 *                 type: string
 *                 description: Product ID
 *               cantidad:
 *                 type: number
 *                 description: Quantity of the product
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Product out of stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error adding product to cart
 */
router.post("/agregar", agregarAlCarrito);

/**
 * @swagger
 * /cart/eliminarProducto:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 description: User ID
 *               productoId:
 *                 type: string
 *                 description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Error removing product from cart
 */
router.delete("/eliminarProducto", eliminarProductoCarrito);

/**
 * @swagger
 * /cart/listar/{usuarioId}:
 *   get:
 *     summary: List the cart of a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Error retrieving cart
 */
router.get("/listar/:usuarioId", listarrCarritoUser);

export default router;