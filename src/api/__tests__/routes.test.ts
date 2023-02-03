import express from 'express'
import request from 'supertest'

import routesAPI from '../routes'

const app = express() //an instance of an express app, a 'fake' express app
app.use('/api', routesAPI) //routes

describe('API health check', () => {
  it('GET /api - success', async () => {
    const { body } = await request(app)
      .get('/api')
      .set({ Accept: 'application/json' })

    expect(body).toEqual({
      data: {
        message: 'Welcome to hyper[local] community engagement api.',
      },
    })
  })
})
