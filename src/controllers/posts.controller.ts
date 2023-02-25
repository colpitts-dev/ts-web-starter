import { Request, Response } from 'express'

import * as postService from '../services/post.service'
import { getErrorMessage } from '../utils/errors.util'

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const doc = await postService.getAllPosts()
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const doc = await postService.createPost(req.body)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const doc = await postService.getPostById(req.params.id)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const doc = await postService.updatePost(req.params.id, req.body)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const doc = await postService.deletePost(req.params.id)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}
