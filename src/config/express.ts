import express, {
  Application,
  json,
  Request,
  Response,
  urlencoded,
} from 'express'
import { create } from 'express-handlebars'
import { Server } from 'http'
import cors from 'cors'
import logger from 'morgan'

import { config } from './env'
import routesAPI from '../api/routes'

function initExpress(): Server {
  const app: Application = express()
  const hbs = create({
    defaultLayout: 'public',
    extname: '.hbs',
  })

  // View engine
  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', process.cwd() + '/views')

  // Middleware
  app.use(cors())
  app.use(logger('dev'))
  app.use(json())
  app.use(urlencoded({ extended: false }))

  // Routes
  app.get('/', (req: Request, res: Response) => {
    return res.render('landing', {
      title: 'hyper[local]',
      content: 'community engagement platform',
    })
  })

  // API Endpoints
  app.use('/api', routesAPI)

  // Catchall for not found
  app.get('*', function (req, res) {
    if (req.header('Accept')?.includes('application/json')) {
      res.status(400).send({
        data: { error: 'resource does not exist' },
      })
    } else {
      res.status(404).render('landing', {
        title: '404 Not Found',
        content: 'please check the url and try again',
      })
    }
  })

  // Fire it up!
  return app.listen(config.port, () =>
    console.log(
      `🚀 [${config.appName}]: Web server listening on ${config.port}`,
    ),
  )
}

export default initExpress
