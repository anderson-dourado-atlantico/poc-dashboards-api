import { Entity } from '../../entities/entity'
import { FilterBase } from '../filter-base-contract'
import { SortParams, SortRepository } from '../sort-repository-contract'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySortRepository<
    E extends Entity,
    F extends FilterBase<E>,
  >
  extends InMemoryRepository<E>
  implements SortRepository<E, F>
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
      if (a[sort.field] > b[sort.field]) return 1
      if (a[sort.field] < b[sort.field]) return -1

      return 0
    })

    return sortedItems
  }
}
