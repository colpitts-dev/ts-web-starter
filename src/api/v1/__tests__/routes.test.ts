import express from 'express'
import request from 'supertest'

import routesV1 from '../routes'
import Person, { PersonDocument } from '../../../models/person.model'

const app = express() //an instance of an express app, a 'fake' express app
app.use('/api/v1', routesV1) //routes

describe('v1 API routes', () => {
  let john: PersonDocument, jane: PersonDocument

  // Seed 2 people in our test DB
  beforeAll(async () => {
    john = new Person({
      firstName: 'John',
      email: 'john.doe@example.com',
      age: 32,
    })
    await john.save()

    jane = new Person({
      firstName: 'Jane',
      email: 'jane.doe@example.com',
      age: 23,
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

  describe('People routes', () => {
    it('GET /v1/people - success', async () => {
      const { body } = await request(app)
        .get('/api/v1/people')
        .set({ Accept: 'application/json' })
      const { data } = body

      expect(data.people.length).toEqual(2)
      expect(data.people[0].email).toEqual('john.doe@example.com')
      expect(data.people[1].email).toEqual('jane.doe@example.com')
    })

    it('GET /v1/people/:id - success', async () => {
      const { body } = await request(app)
        .get(`/api/v1/people/${jane._id}`)
        .set({ Accept: 'application/json' })
      const { data } = body

      expect(data.people[0].email).toBe('jane.doe@example.com')
    })
  })
})
