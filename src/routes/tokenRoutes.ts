import { Router } from "express"
import { storeToken, logout } from "../controllers/TokenController"

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token armazenado com sucesso."
 */
route.post("/", storeToken)

/**
 * @openapi
 * /tokens/logout:
 *   post:
 *     summary: Invalida o token de autenticação do usuário, encerrando sua sessão
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
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout realizado com sucesso."
 *       400:
 *         description: Token não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido."
 */
route.post("/logout", logout)


export default route
