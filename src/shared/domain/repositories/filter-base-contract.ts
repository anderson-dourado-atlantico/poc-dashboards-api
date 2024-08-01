import { Entity } from '../entities/entity'

export abstract class FilterBase<E extends Entity, Context = any> {
  abstract applyFilter(context: Context): Promise<E[]>
}
