import { Router, Request, Response } from 'express'

import authRoutes from './auth.routes'
import peopleRoutes from './people.routes'
import postsRoutes from './posts.routes'
import { auth } from '../../middleware/auth'

const routes = Router()

// Public Routes
routes.use('/auth', authRoutes)
routes.get('/', (req: Request, res: Response) => {
  if (req.header('Accept')?.includes('application/json')) {
    res.send({
      data: { message: 'v1.0.0' },
    })
  } else {
    return res.render('landing', {
      title: 'hyper[local]',
      content: 'api version one',
    })
  }
})

// Private Routes
routes.use('/people', auth, peopleRoutes)
routes.use('/posts', auth, postsRoutes)

export default routes
