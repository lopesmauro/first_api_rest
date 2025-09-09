import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { showUser, storeUser, deleteUser, updateUser, getUserById } from "../controllers/UserController"

const route = Router()


/**
 * @openapi
 * /user:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
route.get("/", loginRequired, showUser)

/**
 * @openapi
 * /user/:id:
 *   get:
 *     summary: Retorna um usuário pelo id
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
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
 *               username:
 *                 type: string
 *                 example: "mauro"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado
 */
route.post("/", storeUser)


/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Deleta um usuário
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado
 */
route.delete("/", loginRequired, deleteUser)


/**
 * @openapi
 * /user/:id:
 *   put:
 *     summary: Atualiza um usuário
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
route.put("/:id", loginRequired, updateUser)

export default route
