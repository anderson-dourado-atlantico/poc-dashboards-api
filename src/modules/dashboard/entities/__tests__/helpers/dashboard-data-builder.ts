import { faker } from '@faker-js/faker'

import { DashboardProps } from '../../dashboard.entity'

type Props = {
  folderId?: string
  name?: string
  alias?: string
  embeddedLink?: string
  createdAt?: Date
  updatedAt?: Date
}

export function DashboardDataBuilder(props: Props): DashboardProps {
  return {
    folderId: props.folderId ?? faker.string.uuid(),
    embeddedLink: props.embeddedLink ?? faker.internet.url(),
    name: props.name ?? faker.word.words({ count: { min: 3, max: 5 } }),
    alias: props.alias ?? faker.word.sample(5),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  }
}
