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
import { Person } from '../models/person.model'

function initExpress(): Server {
  const app: Application = express()
  const hbs = create({
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

  // Example Route
  app.get('/', async (req: Request, res: Response) => {
    let data = {}

    try {
      const people = await Person.find()
      data = { people }
    } catch (e) {
      data = { error: e }
      console.error(e)
    }

    return res.render('landing', {
      title: 'hyper[local]',
      content: 'community engagement platform',
      layout: 'public',
      data,
    })
  })

  // Fire it up!
  return app.listen(config.port, () =>
    console.log(
      `🚀 [${config.appName}]: Web server listening on ${config.port}`,
    ),
  )
}

export default initExpress
