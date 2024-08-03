import { Entity, EntityProps } from '@/shared/domain/entities/entity'

export enum DashboardType {
  FOLDER = 'FOLDER',
  ITEM = 'ITEM',
}

export type DashboardContentProps = {
  folderParentId: string | null
  type: DashboardType
  name: string
  alias: string
} & EntityProps

export class DashboardContentEntity extends Entity<DashboardContentProps> {
  constructor(
    public readonly props: DashboardContentProps,
    id?: string,
  ) {
    super(props, id)
  }

  get folderParentId() {
    return this.props.folderParentId
  }

  get type() {
    return this.props.type
  }

  get name() {
    return this.props.name
  }

  get alias() {
    return this.props.alias
  }
}
