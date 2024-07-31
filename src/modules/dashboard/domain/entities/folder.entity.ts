import { Entity, EntityProps } from '@/shared/domain/entities/entity'

export type FolderProps = {
  folderParentId: string | undefined
  name: string
  alias: string
} & EntityProps

export class FolderEntity extends Entity<FolderProps> {
  constructor(
    public readonly props: FolderProps,
    id?: string,
  ) {
    super(props, id)
  }
}
