import { PersonDocument } from './person.model'
import { model, Schema, Document } from 'mongoose'

export interface CommentInput {
  content: string
}

export interface CommentDocument extends CommentInput, Document {
  owner: PersonDocument['_id']
  updatedAt: Date
  createdAt: Date
}

const CommentSchema = new Schema<CommentDocument>(
  {
    content: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(?!\s*$).+/.test(v)
        },
        message: 'Please add a valid comment.',
      },
      required: [true, 'Content is required.'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

/**
 * Comment Model
 * @constructor Comment
 * ----
 * People comment on posts
 *
 */

export const Comment = model<CommentDocument>('Comment', CommentSchema)
export default Comment
