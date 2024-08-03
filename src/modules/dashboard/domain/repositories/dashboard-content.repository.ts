import { ISortRepository } from '@/shared/domain/repositories/sort-repository-contract'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'
import { DashboardContentEntity } from '../entities/dashboard-content.entity'

export interface IDashboardContentRepository
  extends ISortRepository<
    DashboardContentEntity,
    FilterBase<DashboardContentEntity>
  > {}
