import { DashboardEntity } from '../entities/dashboard.entity'
import { ISortRepository } from '@/shared/domain/repositories/sort-repository-contract'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export interface IDashboardRepository
  extends ISortRepository<DashboardEntity, FilterBase<DashboardEntity>> {}
