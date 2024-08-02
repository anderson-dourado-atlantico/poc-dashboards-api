import {
  FolderEntity,
  FolderProps,
} from '@/modules/dashboard/domain/entities/folder.entity'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export type FolderFilterProps = {
  name?: string
  alias?: string
  folderParentId?: string
}

export class FolderFilter implements FilterBase<FolderEntity> {
  constructor(public readonly props: FolderFilterProps) {}

  async applyFilter(context: FolderEntity[]): Promise<FolderEntity[]> {
    let itemsFiltered = context

    if (this.props.folderParentId && this.props.folderParentId !== '') {
      itemsFiltered = itemsFiltered.filter(
        item => item.props.folderParentId === this.props.folderParentId,
      )
    }

    if (
      this.props.folderParentId === null ||
      this.props.folderParentId === undefined
    ) {
      itemsFiltered = itemsFiltered.filter(
        item => item.props.folderParentId === null,
      )
    }

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

    return itemsFiltered
  }
}
