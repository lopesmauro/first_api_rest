import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { storeUser, deleteUser, updateUser, getUserById } from "../controllers/UserController"

const route = Router()

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário pelo id
 *     description: Pode retornar dados diretamente do banco ou do cache Redis.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário encontrado."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     name:
 *                       type: string
 *                       example: "Mauro"
 *                     email:
 *                       type: string
 *                       example: "mauro@email.com"
 *       404:
 *         description: Usuário não encontrado
 */
route.get("/:id", loginRequired, getUserById)

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mauro"
 *               email:
 *                 type: string
 *                 example: "mauro@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     name:
 *                       type: string
 *                       example: "Mauro"
 *                     email:
 *                       type: string
 *                       example: "mauro@email.com"
 */
route.post("/", storeUser)

/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Deleta o usuário logado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário deletado com sucesso."
 */
route.delete("/", loginRequired, deleteUser)

/**
 * @openapi
 * /user:
 *   put:
 *     summary: Atualiza o usuário logado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 example: "novoemail@email.com"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     name:
 *                       type: string
 *                       example: "Novo Nome"
 *                     email:
 *                       type: string
 *                       example: "novoemail@email.com"
 */
route.put("/", loginRequired, updateUser)

export default route
