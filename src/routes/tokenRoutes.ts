import { Router } from "express"
import storeToken from "../controllers/TokenController"

const route = Router()

/**
 * @openapi
 * /tokens:
 *   post:
 *     summary: Cria um novo token
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abcdef123456"
 *     responses:
 *       201:
 *         description: Token criado com sucesso
 */
route.post("/", storeToken)

export default route
