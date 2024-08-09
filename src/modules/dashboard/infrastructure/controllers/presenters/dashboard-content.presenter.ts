import {
  DashboardContentEntity,
  DashboardType,
} from '@/modules/dashboard/domain/entities/dashboard-content.entity'
import { DashboardItemEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'

export class DashboardContentPresenter {
  readonly id: string
  readonly folderParentId: string
  readonly name: string
  readonly alias: string
  readonly type: DashboardType
  readonly embeddedLink?: string | null

  constructor(props: DashboardContentEntity) {
    this.id = props.id
    this.folderParentId = props.folderParentId ?? ''
    this.name = props.name
    this.alias = props.alias
    this.type = props.type

    if (
      this.type === DashboardType.ITEM &&
      props instanceof DashboardItemEntity &&
      props.embeddedLink
    ) {
      this.embeddedLink = props.embeddedLink
    }
  }
}
