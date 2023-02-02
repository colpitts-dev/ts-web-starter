import mongoose, { connect } from 'mongoose'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

import Person from '../src/models/person.model'
import Post, { PostDocument } from '../src/models/post.model'
import Comment, { CommentDocument } from '../src/models/comment.model'

dotenv.config()

const PEOPLE_SEEDS = 20
const MAX_POST_SEEDS = 10
const MAX_COMMENT_SEEDS = 5

const getPersonSeed = () => {
  const first = faker.name.firstName()
  const last = faker.name.firstName()

  return {
    firstName: first,
    lastName: last,
    email: faker.internet.email(first, last),
    age: faker.datatype.number({ min: 18, max: 50 }),
  }
}

const getContentSeed = () => ({
  content: faker.lorem.sentences(),
})

async function run() {
  const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  // Seed people w/posts that have comments
  let i = 0
  while (i < PEOPLE_SEEDS) {
    console.log(`👤 Adding person ${i + 1}/${PEOPLE_SEEDS}`)
    const personInput = getPersonSeed()
    const person = new Person({ ...personInput })

    const POST_SEEDS = Math.round(Math.random() * MAX_POST_SEEDS)
    const posts = new Array<PostDocument>()
    const comments = new Array<CommentDocument>()
    let j = 0
    while (j < POST_SEEDS) {
      const postInput = getContentSeed()
      const newPost = new Post({ ...postInput })

      const COMMENT_SEEDS = Math.round(Math.random() * MAX_COMMENT_SEEDS)
      let k = 0
      while (k < COMMENT_SEEDS) {
        const commentInput = getContentSeed()
        const newComment = new Comment({ ...commentInput, owner: person })
        const data = await newComment.save()
        comments.push(data)
        k++
      }
      newPost.comments = comments
      await newPost.save()
      posts.push(newPost)
      j++
    }
    person.posts = posts
    person.comments = comments
    await person.save()

    i++
  }

  await mongoose.connection.close()
  console.log('\n')
  console.log('🌱 Database seeded with sample data')
  console.log('👋 Please start the app using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
