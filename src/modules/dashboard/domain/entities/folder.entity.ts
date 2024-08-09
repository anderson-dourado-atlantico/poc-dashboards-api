import { Entity, EntityProps } from '@/shared/domain/entities/entity'
import {
  DashboardContentEntity,
  DashboardContentProps,
  DashboardType,
} from './dashboard-content.entity'

export type FolderProps = {
  content?: DashboardContentEntity[] | null
} & DashboardContentProps

export class FolderEntity extends DashboardContentEntity {
  constructor(
    readonly props: FolderProps,
    id?: string,
  ) {
    super(props, id)
    this.props.type = DashboardType.FOLDER
  }

  get content(): DashboardContentEntity[] | null {
    return this.props.content ? this.props.content : null
  }

  addContent(entity: DashboardContentEntity) {
    if (!this.content) {
      this.props.content = []
    }

    this.props.content.push(entity)
  }

  toJSON(): Required<
    { id: string } & {
      folderParentId: string | null
      type: DashboardType
      name: string
      alias: string
    } & EntityProps
  > {
    let content =
      this.content && this.content.length > 0
        ? this.content.map(item => item.toJSON())
        : null

    return {
      ...Object.assign(super.toJSON(), { content }),
    }
  }
}
