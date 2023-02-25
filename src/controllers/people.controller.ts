import { Request, Response } from 'express'

import * as personService from '../services/person.service'
import { getErrorMessage } from '../utils/errors.util'

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const doc = await personService.getAllPeople()
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const createPerson = async (req: Request, res: Response) => {
  try {
    const doc = await personService.createPerson(req.body)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const doc = await personService.getPersonById(req.params.id)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const doc = await personService.updatePerson(req.params.id, req.body)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const doc = await personService.deletePerson(req.params.id)
    res.json({ data: doc, status: 'success' })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}
