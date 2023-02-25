import { Router } from 'express'

import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from '../../controllers/posts.controller'

const router = Router()

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)

export default router
