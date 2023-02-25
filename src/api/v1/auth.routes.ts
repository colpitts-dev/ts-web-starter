import { Router } from 'express'

import * as authController from '../../controllers/auth.controller'

const routes = Router()

routes.post('/login', authController.login)
routes.post('/register', authController.register)

export default routes
