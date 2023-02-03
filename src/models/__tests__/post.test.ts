import { faker } from '@faker-js/faker'

import Post, { PostDocument, PostInput } from '../post.model'
import Person, { PersonDocument, PersonInput } from '../person.model'

describe('Post model', () => {
  let owner: PersonDocument, post: PostDocument, postInput: PostInput

  beforeAll(async () => {
    owner = new Person<PersonInput>({
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 18, max: 50 }),
    })
    await owner.save()

    postInput = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }

    post = new Post({ ...postInput })
    post.owner = owner

    await post.save()
  })

  afterAll(async () => {
    await owner.delete()
    await post.delete()
  })

  it('creates and reads a document given valid input', async () => {
    const fetchedPost = await Post.findOne({ _id: post._id })
    expect(fetchedPost).toMatchObject(postInput)
  })

  it('belongs to a person', async () => {
    const fetchedPost = await Post.findById({ _id: post._id }).populate('owner')
    expect(fetchedPost?.owner?.firstName).toEqual(owner?.firstName)
  })

  describe('when validating documents', () => {
    const invalidPost = new Post({
      content: '  ',
    })
    const validationResult = invalidPost.validateSync()

    it('requires valid content', () => {
      const validationError = validationResult?.errors?.content?.message
      expect(validationError).toBe('Content is required.')
    })
  })
})
