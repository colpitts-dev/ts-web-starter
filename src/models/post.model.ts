import { model, Schema, Document } from 'mongoose'
import { CommentDocument } from './comment.model'
import { PersonDocument } from './person.model'

// Post interfaces
export interface PostInput {
  title?: string
  content: string
}

export interface PostDocument extends PostInput, Document {
  owner: PersonDocument['_id']
  comments: CommentDocument['_id'][]
  updatedAt: Date
  createdAt: Date
}

// Post schema
const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(?!\s*$).+/.test(v)
        },
        message: 'Content cannot be blank.',
      },
      required: [true, 'Content is required.'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
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

/**
 * Post Model
 * A post is made to update other people in the community
 *
 * @constructor Post
 */
export const Post = model<PostDocument>('Post', PostSchema)
export default Post
