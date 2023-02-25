import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

import Comment, { CommentDocument } from './comment.model'
import Post, { PostDocument } from './post.model'

const saltRounds = 8
// Person Interfaces
export interface PersonInput {
  email: string
  password: string
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
    password: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /.{8,}/.test(v)
        },
        message: 'Password must be at least 8 characters.',
      },
      required: [true, 'Password is required.'],
    },
    lastName: { type: String },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /[^\s@]+@[^\s@]+\.[^\s@]+/gi.test(v)
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
        ref: Post,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: Comment,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true, // to create updatedAt and createdAt
  },
)

// Pre-save hooks
PersonSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

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
