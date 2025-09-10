import { Request, Response } from "express"
import User from "../models/User.ts"
import { RequestUserData } from "../types/RequestUserData.ts"
import { createClient } from 'redis'

const client = createClient()
client.connect()

const storeUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body
    const newUser = await User.create({ name, email, password })

    if (!newUser) {
      return res.status(400).json({ message: "Não foi possível criar esse usuário." })
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: {
        id: newUser.get("id"),
        name: newUser.get("name"),
        email: newUser.get("email"),
      }
    })
  } catch (e: any) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err: any) => err.message) })
    }
    return res.status(500).json({ message: "Erro ao criar usuário." })
  }
}

const deleteUser = async (req: RequestUserData, res: Response): Promise<any> => {
  try {
    if (!req.userId) return res.status(400).json({ message: "ID não enviado." })

    const user = await User.findByPk(req.userId)
    if (!user) return res.status(404).json({ message: "Usuário não existe." })

    await user.destroy()
    await client.del(`user:${req.userId}`)

    return res.status(200).json({ message: "Usuário deletado com sucesso." })
  } catch (e: any) {
    return res.status(400).json({ errors: e.errors?.map((err: any) => err.message) || [e.message] })
  }
}

const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    const userFromCache = await client.get(`user:${id}`)
    if (userFromCache) {
      return res.status(200).json({
        message: "Usuário encontrado.",
        user: JSON.parse(userFromCache)
      })
    }

    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." })

    const userData = {
      id: user.get("id"),
      name: user.get("name"),
      email: user.get("email"),
    }

    await client.set(`user:${id}`, JSON.stringify(userData), { EX: 10 })

    return res.status(200).json({ message: "Usuário encontrado.", user: userData })
  } catch (e: any) {
    return res.status(500).json({ message: "Não foi possível realizar esta operação." })
  }
}

const updateUser = async (req: RequestUserData, res: Response): Promise<any> => {
  try {
    if (!req.userId) return res.status(400).json({ message: "ID não enviado." })

    const user = await User.findByPk(req.userId)
    if (!user) return res.status(404).json({ message: "Usuário não existe." })

    await user.update(req.body)
    await client.del(`user:${req.userId}`)

    return res.status(200).json({ message: "Usuário atualizado com sucesso.", user })
  } catch (e: any) {
    return res.status(400).json({ errors: e.errors?.map((err: any) => err.message) || [e.message] })
  }
}

export { getUserById, storeUser, deleteUser, updateUser }
