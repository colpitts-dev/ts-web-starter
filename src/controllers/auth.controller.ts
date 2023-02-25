import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/errors.util'
import * as authServices from '../services/auth.service'

export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await authServices.login(req.body)
    res.status(200).send({ status: 'success', data: foundUser })
  } catch (error) {
    return res.status(500).json({
      error: getErrorMessage(error),
    })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    await authServices.register(req.body)
    res
      .status(200)
      .send({ status: 'success', data: { message: 'Registration successful' } })
  } catch (error) {
    return res.status(500).json({
      error: getErrorMessage(error),
    })
  }
}
