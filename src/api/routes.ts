import { Request, Response, Router } from 'express'
import routesV1 from './v1/routes'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  if (req.header('Accept')?.includes('application/json')) {
    res.send({
      data: { message: 'Welcome to hyper[local] community engagement api.' },
    })
  } else {
    return res.render('landing', {
      title: 'hyper[local]',
      content: 'community engagement web api',
    })
  }
})

routes.use('/v1', routesV1)

export default routes
