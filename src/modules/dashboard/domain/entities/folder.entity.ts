import { Entity } from '@/shared/domain/entities/entity'
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

  get content() {
    return this.props.content
  }
}
