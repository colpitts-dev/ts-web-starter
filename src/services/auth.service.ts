/* eslint-disable no-useless-catch */
import { DocumentDefinition } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from '../config/env'
import PersonModel, { PersonDocument } from '../models/person.model'

export async function register(
  person: DocumentDefinition<PersonDocument>,
): Promise<void> {
  await PersonModel.create(person)
}

export async function login(person: DocumentDefinition<PersonDocument>) {
  try {
    const foundPerson = await PersonModel.findOne({ email: person.email })

    if (!foundPerson) {
      throw new Error('No user found with that email.')
    }

    const isMatch = bcrypt.compareSync(person.password, foundPerson.password)

    if (isMatch) {
      const token = jwt.sign(
        { _id: foundPerson._id?.toString(), email: foundPerson.email },
        config.jwtSecret,
        {
          expiresIn: '2 days',
        },
      )

      return { person: foundPerson, token: token }
    } else {
      throw new Error('Password is not correct')
    }
  } catch (error) {
    throw error
  }
}
