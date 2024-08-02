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

  constructor(props: SortProps) {
    this.field = props.field ?? null
    this.direction = props.direction ?? 'asc'
  }
}

export interface ISortRepository<E extends Entity, Filter extends FilterBase<E>>
  extends IRepositoryInterface<E> {
  search(filter: Filter, sort?: SortParams): Promise<E[]>
}
