import { DashboardEntity } from '../entities/dashboard.entity'
import { SortRepository } from '@/shared/domain/repositories/sort-repository-contract'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export interface DashboardRepository
  extends SortRepository<DashboardEntity, FilterBase<DashboardEntity>> {}
