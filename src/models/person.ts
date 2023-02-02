import { model, Schema, Document } from 'mongoose'

export interface PersonInput {
  email: string
  firstName: string
  lastName?: string
  age: number
  location?: string
}

export interface PersonDocument extends PersonInput, Document {
  // posts: []
  // communities: []
  updatedAt: Date
  createdAt: Date
}

// Data Schema
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
    // posts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Post',
    //   },
    // ],
    // communities: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Community',
    //   },
    // ],
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

// Data Model
export const Person = model('Person', PersonSchema)
