import { model, Schema, Document } from 'mongoose'

import { CommentDocument } from './comment.model'
import { PostDocument } from './post.model'

// Person Interfaces
export interface PersonInput {
  email: string
  firstName: string
  age: number
  lastName?: string
  location?: string
}

export interface PersonDocument extends PersonInput, Document {
  posts: PostDocument['_id'][]
  comments: CommentDocument['_id'][]
  postCount: number
  commentCount: number
  updatedAt: Date
  createdAt: Date
}

// Person Schema
const PersonSchema = new Schema<PersonDocument>(
  {
    firstName: { type: String, required: [true, 'Name is required.'] },
    lastName: { type: String },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email.',
      },
      required: [true, 'Email is required.'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
      min: [18, 'Must be at least 18 years old.'],
    },
    location: { type: String },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

// Virtual getters
PersonSchema.virtual('postCount').get(function () {
  return this.posts.length || 0
})

PersonSchema.virtual('commentCount').get(function () {
  return this.comments.length || 0
})

/**
 * Person Model
 * People are the foundation of any community
 *
 * @constructor Person
 */
export const Person = model('Person', PersonSchema)
export default Person
