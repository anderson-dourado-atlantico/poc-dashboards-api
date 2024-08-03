import { DashboardItemEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export type DashboadFilterProps = {
  name?: string
  alias?: string
  folderParentId?: string
}

export class DashboardFilter implements FilterBase<DashboardItemEntity> {
  constructor(public readonly props: DashboadFilterProps) {}

  async applyFilter(
    context: DashboardItemEntity[],
  ): Promise<DashboardItemEntity[]> {
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

    if (this.props.folderParentId && this.props.folderParentId !== '') {
      itemsFiltered = itemsFiltered.filter(
        item => item.props.folderParentId === this.props.folderParentId,
      )
    }

    return itemsFiltered
  }
}
