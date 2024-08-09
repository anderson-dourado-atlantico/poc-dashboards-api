import {
  DashboardContentEntity,
  DashboardContentProps,
  DashboardType,
} from './dashboard-content.entity'

export type DashboardItemProps = {
  embeddedLink?: string | null
} & DashboardContentProps

export class DashboardItemEntity extends DashboardContentEntity {
  constructor(
    public readonly props: DashboardItemProps,
    id?: string,
  ) {
    super(props, id)
    this.props.type = DashboardType.ITEM
  }

  get embeddedLink() {
    return this.props.embeddedLink
  }
}
