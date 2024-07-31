import { faker } from '@faker-js/faker'

import { FolderProps } from '../../folder.entity'

type Props = {
  folderParentId?: string | undefined
  name?: string
  alias?: string
  createdAt?: Date
  updatedAt?: Date
}

export function FolderDataBuilder(props: Props): FolderProps {
  return {
    folderParentId: props.folderParentId,
    name: props.name ?? faker.word.words({ count: { min: 3, max: 5 } }),
    alias: props.alias ?? faker.word.sample(5),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  }
}
