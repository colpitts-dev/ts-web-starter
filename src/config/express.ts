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
  app.get('/', (req: Request, res: Response) => {
    return res.render('landing', {
      title: 'hyper[local]',
      content: 'community engagement platform',
      layout: 'public',
    })
  })

  // Fire it up!
  const PORT: string | number = process.env.PORT || 8081
  return app.listen(PORT, () =>
    console.log(`🚀 Web server started on port ${PORT}`),
  )
}

export default initExpress
