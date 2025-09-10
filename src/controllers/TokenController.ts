import 'dotenv/config'
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User, { passwordIsValid } from "../models/User"
import { createClient } from 'redis'

const client = createClient()
client.connect()

const { TOKEN_SECRET, TOKEN_EXPIRATION } = process.env

const storeToken = async (req: Request, res: Response): Promise<any> => {
  const { email, password, } = req.body
  if (!email || !password) {
    return res.status(401).json({
      errors: ['Credenciais inválidas.']
    })
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    return res.status(401).json({
      errors: ['Usuário não existe.']
    })
  }

  if (!await passwordIsValid(password, user)) {
    return res.status(401).json({
      errors: ['Credenciais inválidas.']
    })
  }

  if (!TOKEN_SECRET || !TOKEN_EXPIRATION) {
    return res.status(500).json({
      errors: ['Erro interno..']
    })
  }

  const id = user.get("id")
  const token = jwt.sign({ id, email }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION
  })

  return res.status(200).json({ token })
}

const logout = async (req: Request, res: Response): Promise<any> => {
  try{
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        errors: ['Token não fornecido.']
      })
    }

    await client.set(`blacklist:${token}`, token)

    return res.status(200).json({ message: "Logout realizado com sucesso." })
  } catch(e: any) {
    return res.status(500).json({
      errors: [e.message]
    })
  }
}

export { storeToken, logout }
