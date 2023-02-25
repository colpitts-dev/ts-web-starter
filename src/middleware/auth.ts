import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { config } from '../config/env'

export interface AuthRequest extends Request {
  token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, config.jwtSecret)
    ;(req as AuthRequest).token = decoded

    next()
  } catch (err) {
    res.status(401).json({
      error: 'Unauthorized request.',
    })
  }
}
