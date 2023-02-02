import { faker } from '@faker-js/faker'

import Comment, { CommentDocument, CommentInput } from '../comment.model'
import Person, { PersonDocument, PersonInput } from '../person.model'

describe('Comment model', () => {
  let comment: CommentDocument,
    commentInput: CommentInput,
    owner: PersonDocument

  beforeEach(async () => {
    owner = new Person<PersonInput>({
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 18, max: 50 }),
    })
    await owner.save()

    commentInput = {
      content: faker.lorem.paragraph(),
    }
    comment = new Comment({ ...commentInput, owner })
    await comment.save()
  })

  describe('when given valid input', () => {
    it('creates a new comment', async () => {
      expect(comment).toBeDefined()
    })

    it('reads a comment by id', async () => {
      const fetchedComment = await Comment.findById({ _id: comment._id })
      expect(fetchedComment).toMatchObject(commentInput)
    })

    it('updates a comment by id', async () => {
      const commentUpdateInput: CommentInput = {
        content: faker.lorem.paragraph(),
      }
      await Comment.updateOne({ _id: comment._id }, { ...commentUpdateInput })
      const fetchedComment = await Comment.findById({ _id: comment._id })

      expect(fetchedComment).toBeDefined()
      expect(fetchedComment).toMatchObject(commentUpdateInput)
      expect(fetchedComment).not.toMatchObject(commentInput)
    })

    it('deletes a comment by id', async () => {
      await Comment.findByIdAndDelete({ _id: comment._id })
      const fetchedComment = await Comment.findById({ _id: comment._id })
      expect(fetchedComment).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidComment = new Comment({
      content: '  ',
    })
    const validationResult = invalidComment.validateSync()

    it('requires valid content', () => {
      const validationError = validationResult?.errors?.content?.message
      expect(validationError).toBe('Content is required.')
    })
  })

  describe('when associating documents', () => {
    it('belongs to a person', async () => {
      const fetchedComment = await Comment.findById({
        _id: comment._id,
      }).populate('owner')
      expect(fetchedComment?.owner?.firstName).toEqual(owner?.firstName)
    })
  })
})
