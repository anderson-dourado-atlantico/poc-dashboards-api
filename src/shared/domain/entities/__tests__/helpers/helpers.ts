import { faker } from '@faker-js/faker'

export function fakeUUID() {
  return faker.string.uuid()
}
