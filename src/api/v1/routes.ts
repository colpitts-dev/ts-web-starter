import { Request, Response, Router } from 'express'

import { Person } from '../../models/person.model'

const routes = Router()

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

routes.get('/people', async (req: Request, res: Response) => {
  let data = {}
  try {
    const people = await Person.find()
    data = { people }
  } catch (e) {
    data = { error: e }
    console.error(e)
  }

  if (req.header('Accept')?.includes('application/json')) {
    res.send({
      data,
    })
  } else {
    return res.render('landing', {
      title: 'hyper[local]',
      content: 'community engagement platform',
      data,
    })
  }
})

routes.get('/people/:id', async (req: Request, res: Response) => {
  let data = {}
  try {
    const person = await Person.findById({ _id: req.params.id }).populate({
      path: 'posts',
      populate: {
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'owner',
          model: 'Person',
        },
      },
    })
    const json = person?.toJSON()
    data = {
      people: [{ ...json }],
    }
  } catch (e) {
    data = { error: e }
    console.error(e)
  }

  if (req.header('Accept')?.includes('application/json')) {
    res.send({
      data,
    })
  } else {
    return res.render('person', {
      title: 'hyper[local]',
      content: 'community engagement platform',
      data,
    })
  }
})

export default routes
