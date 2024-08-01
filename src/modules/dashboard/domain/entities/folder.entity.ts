import { Entity, EntityProps } from '@/shared/domain/entities/entity'

export type FolderProps = {
  folderParentId: string | undefined
  name: string
  alias: string
} & EntityProps

export class FolderEntity extends Entity<FolderProps> {
  constructor(
    readonly props: FolderProps,
    id?: string,
  ) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get alias() {
    return this.props.alias
  }

  get folderParentId() {
    return this.props.folderParentId
  }
}
