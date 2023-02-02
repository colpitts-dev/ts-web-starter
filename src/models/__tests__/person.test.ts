import { faker } from '@faker-js/faker'

import { Person, PersonInput } from '../person.model'
import { newPersonMock } from '../__mocks__/person.mock'

describe('Person Model', () => {
  const personInput = newPersonMock()
  const person = new Person({ ...personInput })

  describe('when given valid input', () => {
    it('creates a new person', async () => {
      const createdPerson = await person.save()

      expect(createdPerson).toBeDefined()
      expect(createdPerson.firstName).toBe(person.firstName)
      expect(createdPerson.email).toBe(person.email)
      expect(createdPerson.age).toBe(person.age)
    })

    it('reads an existing person', async () => {
      const fetchedPerson = await Person.findOne({ _id: person._id })

      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson).toMatchObject(personInput)
    })

    it('updates an existing person', async () => {
      const personUpdateInput: PersonInput = {
        firstName: faker.name.firstName(),
        email: faker.internet.email().toLocaleLowerCase(),
        age: faker.datatype.number({ min: 18, max: 50 }),
        location: faker.address.city(),
      }
      await Person.updateOne({ _id: person._id }, { ...personUpdateInput })
      const fetchedPerson = await Person.findOne({ _id: person._id })
      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson).toMatchObject(personUpdateInput)
      expect(fetchedPerson).not.toMatchObject(personInput)
    })

    it('deletes an existing person', async () => {
      await Person.deleteOne({ _id: person._id })
      const fetchedPerson = await Person.findOne({ _id: person._id })
      expect(fetchedPerson).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidPerson = new Person({
      firstName: undefined,
      email: 'invalidatexampledotcom',
      age: 16,
    })
    const validationResult = invalidPerson.validateSync()

    it('requires a first name', () => {
      const validationError = validationResult?.errors?.firstName?.message
      expect(validationError).toBe('Name is required.')
    })

    it('requires a valid email address', () => {
      const validationError = validationResult?.errors?.email?.message
      expect(validationError).toBe('Please enter a valid email.')
    })

    it('requires a person to be at least 18 years old', () => {
      const validationError = validationResult?.errors?.age?.message
      expect(validationError).toBe('Must be at least 18 years old.')
    })
  })
})
