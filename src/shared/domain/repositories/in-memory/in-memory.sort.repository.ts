import { Entity } from '../../entities/entity'
import { FilterBase } from '../filter-base-contract'
import { SortParams, ISortRepository } from '../sort-repository-contract'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySortRepository<
    E extends Entity,
    F extends FilterBase<E>,
  >
  extends InMemoryRepository<E>
  implements ISortRepository<E, F>
{
  async search(filter: F, sort: SortParams = null): Promise<E[]> {
    const filteredItems = await filter.applyFilter(this.items)
    return this.applySort(filteredItems, sort)
  }

  protected async applySort(items: E[], sort?: SortParams): Promise<E[]> {
    if (!sort || !sort.field) {
      return items
    }

    const sortedItems = items.sort((a, b) => {
      const field_a = this._getField(a, sort.field)
      const field_b = this._getField(b, sort.field)
      if (field_a > field_b)
        return sort.direction === 'asc' ||
          sort.direction === undefined ||
          sort.direction === null
          ? 1
          : -1
      if (field_a < field_b)
        return sort.direction === 'asc' ||
          sort.direction === undefined ||
          sort.direction === null
          ? -1
          : 1

      return 0
    })

    return sortedItems
  }

  private _getField(item: E, pathField: string | string[]): any {
    if (typeof pathField === 'string') {
      return item[pathField]
    }

    let value: any = item
    pathField.forEach(path => (value = value[path]))

    return value
  }
}
