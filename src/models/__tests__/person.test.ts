import { faker } from '@faker-js/faker'

import Person, { PersonDocument, PersonInput } from '../person.model'
import { newPersonMock } from '../__mocks__/person.mock'
import Post from '../post.model'
import Comment from '../comment.model'

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

  describe('when associating collections', () => {
    let owner: PersonDocument

    beforeAll(async () => {
      owner = new Person({
        firstName: 'Jane Doe',
        email: faker.internet.email().toLowerCase(),
        age: 22,
      })
      const post = new Post({
        title: 'Test title',
        content: 'test post content',
      })
      const anotherPost = new Post({
        title: 'Another test title',
        content: 'test post content the second.',
      })
      const comment = new Comment({ content: 'test comment conent', owner })
      const anotherComment = new Comment({
        content: 'test comment conent',
        owner,
      })

      // Create model associations
      owner.posts.push(post)
      owner.posts.push(anotherPost)
      owner.comments.push(comment)
      owner.comments.push(anotherComment)

      post.comments.push(comment)
      anotherPost.comments.push(anotherComment)

      // write to database
      await Promise.all([
        owner.save(),
        post.save(),
        anotherPost.save(),
        comment.save(),
      ])
    })

    it('returns a full relation graph', async () => {
      const person = await Person.findById({ _id: owner._id }).populate({
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

      expect(person?.firstName).toEqual('Jane Doe')
      expect(person?.posts[0]?.title).toEqual('Test title')
      expect(person?.posts[1]?.title).toEqual('Another test title')
      expect(person?.posts[0]?.comments[0]?.content).toEqual(
        'test comment conent',
      )
    })

    it('returns virtual postCount', async () => {
      const person = await Person.findById({ _id: owner._id })
      expect(person?.postCount).toEqual(2)
    })

    it('returns virtual commentCount', async () => {
      const person = await Person.findById({ _id: owner._id })
      expect(person?.commentCount).toEqual(2)
    })
  })
})
