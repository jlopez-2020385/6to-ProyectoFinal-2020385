import { Router } from "express";
import { realizarCompra, obtenerHistorialCompras } from "./shopping.controller.js";

const router = Router();

/**
 * @swagger
 * /shopping/comprar:
 *   post:
 *     summary: Make a purchase
 *     tags: [Shopping]
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
 *     responses:
 *       200:
 *         description: Purchase made successfully
 *       400:
 *         description: Cart is empty or insufficient stock
 *       500:
 *         description: Error making purchase
 */
router.post("/comprar", realizarCompra);

/**
 * @swagger
 * /shopping/historial/{usuarioId}:
 *   get:
 *     summary: Get purchase history of a user
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Purchase history retrieved successfully
 *       404:
 *         description: No purchases found for this user
 *       500:
 *         description: Error retrieving purchase history
 */
router.get("/historial/:usuarioId", obtenerHistorialCompras);

export default router;