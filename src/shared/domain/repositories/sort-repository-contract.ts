import { Entity } from '../entities/entity'
import { FilterBase } from './filter-base-contract'
import { RepositoryInterface } from './repository-contract'

export type SortDirection = 'asc' | 'desc'

export type SortProps = {
  field?: string | null
  direction?: SortDirection | null
}

export class SortParams {
  readonly field: string | null
  readonly direction?: SortDirection | null

  constructor(props: SortProps, next?: SortParams) {
    this.field = props.field ?? null
    this.direction = props.direction ?? 'asc'
  }
}

export interface SortRepository<E extends Entity, Filter extends FilterBase<E>>
  extends RepositoryInterface<E> {
  search(filter: Filter, sort?: SortParams): Promise<E[]>
}
