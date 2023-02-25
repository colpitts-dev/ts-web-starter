import express, { json, urlencoded } from 'express'
import request from 'supertest'

import authRoutes from '../auth.routes'
import Person, { PersonDocument } from '../../../models/person.model'

const app = express() //an instance of an express app, a 'fake' express app
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1/auth', authRoutes) //routes

describe('v1 Auth routes', () => {
  let john: PersonDocument, jane: PersonDocument

  // Seed 2 people in our test DB
  beforeAll(async () => {
    john = new Person({
      firstName: 'John',
      email: 'john.doe3@example.com',
      age: 32,
      password: 'foobarbaz',
    })
    await john.save()

    jane = new Person({
      firstName: 'Jane',
      email: 'jane.doe3@example.com',
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

  it('POST /auth/login - success', async () => {
    const { body } = await request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'john.doe3@example.com',
        password: 'foobarbaz',
      })

    expect(body.status).toEqual('success')
    expect(body.data.person).toBeDefined()
  })

  it('POST /auth/register - success', async () => {
    const { body } = await request(app)
      .post('/api/v1/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        email: 'john.doe+007@example.com',
        password: 'foobarbaz',
        age: 21,
      })

    expect(body.status).toEqual('success')
    expect(body.data.message).toEqual('Registration successful')
  })
})
