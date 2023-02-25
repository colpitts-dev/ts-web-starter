import express, { json, urlencoded } from 'express'
import request from 'supertest'

import peopleRoutes from '../people.routes'
import Person, { PersonDocument } from '../../../models/person.model'

const app = express() //an instance of an express app, a 'fake' express app
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1/people', peopleRoutes) //routes

describe('v1 People routes', () => {
  let john: PersonDocument, jane: PersonDocument

  // Seed 2 people in our test DB
  beforeAll(async () => {
    john = new Person({
      firstName: 'John',
      email: 'john.doe1@example.com',
      age: 32,
      password: 'foobarbaz',
    })
    await john.save()

    jane = new Person({
      firstName: 'Jane',
      email: 'jane.doe2@example.com',
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

  it('GET /people - success', async () => {
    const { body } = await request(app)
      .get('/api/v1/people')
      .set('Content-Type', 'application/json')

    expect(body.status).toEqual('success')
  })

  it('POST /people - success', async () => {
    const { body } = await request(app)
      .post('/api/v1/people')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'tester',
        email: 'test@example.com',
        password: 'testpass',
        age: 19,
      })

    expect(body.status).toEqual('success')
  })

  // it('POST /auth/register - success', async () => {
  //   const { body } = await request(app)
  //     .post('/api/v1/auth/register')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       firstName: 'John',
  //       email: 'john.doe+007@example.com',
  //       password: 'foobarbaz',
  //       age: 21,
  //     })

  //   expect(body.status).toEqual('success')
  //   expect(body.data.message).toEqual('Registration successful')
  // })
})
