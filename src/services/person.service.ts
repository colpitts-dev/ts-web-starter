import Person, { PersonInput } from '../models/person.model'

export const getAllPeople = async () => {
  return await Person.find()
}

export const createPerson = async (newPerson: PersonInput) => {
  return await Person.create(newPerson)
}

export const getPersonById = async (id: string) => {
  return await Person.findById(id)
}

export const updatePerson = async (id: string, updatedPerson: PersonInput) => {
  return await Person.findByIdAndUpdate(id, updatedPerson)
}

export const deletePerson = async (id: string) => {
  return await Person.findByIdAndDelete(id)
}
