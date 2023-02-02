import { faker } from '@faker-js/faker'

import { PersonInput } from '../Person'

export const newPersonMock = (): PersonInput => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLocaleLowerCase(),
  age: faker.datatype.number({ min: 18, max: 50 }),
  location: faker.address.cityName(),
})

export const mockPeopleData = (count = 2) => {
  const mockPeople = []
  for (let i = 0; i < count; i++) {
    mockPeople.push(newPersonMock())
  }
  return mockPeople
}
