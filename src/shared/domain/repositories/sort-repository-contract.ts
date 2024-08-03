import { Entity } from '../entities/entity'
import { FilterBase } from './filter-base-contract'
import { IRepositoryInterface } from './repository-contract'

export type SortDirection = 'asc' | 'desc'

export type SortProps = {
  field?: string | string[] | null
  direction?: SortDirection | null
}

export class SortParams {
  readonly field: string | string[] | null
  readonly direction?: SortDirection | null
  private _next?: SortParams | null

  constructor(props: SortProps) {
    this.field = props.field ?? null
    this.direction = props.direction ?? 'asc'
    this._next = null
  }

  private set next(next: SortParams) {
    this._next = next
  }

  get next() {
    return this._next
  }

  addNext(next: SortParams): SortParams {
    this.next = next
    return this.next
  }
}

export interface ISortRepository<E extends Entity, Filter extends FilterBase<E>>
  extends IRepositoryInterface<E> {
  search(filter: Filter, sort?: SortParams): Promise<E[]>
}
