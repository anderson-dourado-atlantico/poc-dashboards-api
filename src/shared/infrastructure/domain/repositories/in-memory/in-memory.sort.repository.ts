import { Entity } from '../../../../domain/entities/entity'
import { FilterBase } from '../../../../domain/repositories/filter-base-contract'
import {
  SortParams,
  ISortRepository,
} from '../../../../domain/repositories/sort-repository-contract'
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

    return items.sort((a, b) => this._compareValues(a, b, sort))
  }

  private _compareValues(a: E, b: E, sort: SortParams): number {
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

    if (sort.next && sort.next.field) {
      return this._compareValues(a, b, sort.next)
    }

    return 0
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
