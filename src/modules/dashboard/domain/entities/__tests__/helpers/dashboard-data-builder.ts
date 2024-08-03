import { faker } from '@faker-js/faker'

import { DashboardItemProps } from '../../dashboard.entity'
import { DashboardType } from '../../dashboard-content.entity'

type Props = {
  folderParentId?: string
  name?: string
  alias?: string
  embeddedLink?: string
  createdAt?: Date
  updatedAt?: Date
}

export function DashboardDataBuilder(props: Props): DashboardItemProps {
  return {
    folderParentId: props.folderParentId ?? faker.string.uuid(),
    type: DashboardType.ITEM,
    embeddedLink: props.embeddedLink ?? faker.internet.url(),
    name: props.name ?? faker.word.words({ count: { min: 3, max: 5 } }),
    alias: props.alias ?? faker.word.sample(5),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  }
}
