import express, { json, urlencoded } from 'express'
import request from 'supertest'

import routesV1 from '../index.routes'
import Person, { PersonDocument } from '../../../models/person.model'

const app = express() //an instance of an express app, a 'fake' express app
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1', routesV1) //routes

describe('v1 API routes', () => {
  let john: PersonDocument, jane: PersonDocument

  // Seed 2 people in our test DB
  beforeAll(async () => {
    john = new Person({
      firstName: 'John',
      email: 'john.doe@example.com',
      age: 32,
      password: 'foobarbaz',
    })
    await john.save()

    jane = new Person({
      firstName: 'Jane',
      email: 'jane.doe@example.com',
      age: 23,
      password: 'foobarbaz',
    })
    await jane.save()
  })

  // Cleanup after tests
  afterAll(async () => {
    await john.delete()
    await jane.delete()
  })

  it('GET /v1 - success', async () => {
    const { body } = await request(app)
      .get('/api/v1')
      .set({ Accept: 'application/json' })

    expect(body).toEqual({
      data: {
        message: 'v1.0.0',
      },
    })
  })

  describe('Protected Resources', () => {
    it('GET /people - requires valid auth token', async () => {
      const { body } = await request(app)
        .get('/api/v1/people')
        .set('Content-Type', 'application/json')

      expect(body.error).toEqual('Unauthorized request.')
    })

    it('GET /posts - requires valid auth token', async () => {
      const { body } = await request(app)
        .get('/api/v1/posts')
        .set('Content-Type', 'application/json')

      expect(body.error).toEqual('Unauthorized request.')
    })

    describe('with a valid jwt token', () => {
      let jwt: string

      beforeAll(async () => {
        const { body } = await request(app)
          .post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.doe@example.com',
            password: 'foobarbaz',
          })
        jwt = body?.data.token
      })

      it('GET /people - success', async () => {
        const { body } = await request(app)
          .get('/api/v1/people')
          .set('Authorization', `Bearer ${jwt}`)
          .set('Content-Type', 'application/json')

        expect(body.status).toEqual('success')
      })
    })
  })
})
