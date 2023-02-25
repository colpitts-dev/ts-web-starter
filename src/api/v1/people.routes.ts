import { Router } from 'express'

import {
  getAllPeople,
  createPerson,
  getPersonById,
  updatePerson,
  deletePerson,
} from '../../controllers/people.controller'

const router = Router()

router.route('/').get(getAllPeople).post(createPerson)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson)

export default router
