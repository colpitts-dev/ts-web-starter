import Post, { PostInput } from '../models/post.model'

export const getAllPosts = async () => {
  return await Post.find()
}

export const createPost = async (newPost: PostInput) => {
  return await Post.create(newPost)
}

export const getPostById = async (id: string) => {
  return await Post.findById(id)
}

export const updatePost = async (id: string, updatedPost: PostInput) => {
  return await Post.findByIdAndUpdate(id, updatedPost)
}

export const deletePost = async (id: string) => {
  return await Post.findByIdAndDelete(id)
}
