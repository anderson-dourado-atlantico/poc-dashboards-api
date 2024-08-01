import { DashboardEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export type DashboadFilterProps = {
  name?: string
  alias?: string
  folderId?: string
}

export class DashboardFilter implements FilterBase<DashboardEntity> {
  constructor(public readonly props: DashboadFilterProps) {}

  async applyFilter(context: DashboardEntity[]): Promise<DashboardEntity[]> {
    let itemsFiltered = context

    if (this.props.name && this.props.name !== '') {
      itemsFiltered = itemsFiltered.filter(item =>
        item.props.name.toLowerCase().includes(this.props.name.toLowerCase()),
      )
    }

    if (this.props.alias && this.props.alias !== '') {
      itemsFiltered = itemsFiltered.filter(item =>
        item.props.alias.toLowerCase().includes(this.props.alias.toLowerCase()),
      )
    }

    if (this.props.folderId && this.props.folderId !== '') {
      itemsFiltered = itemsFiltered.filter(
        item => item.props.folderId === this.props.folderId,
      )
    }

    return itemsFiltered
  }
}
