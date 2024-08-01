import { RepositoryInterface } from '@/shared/domain/repositories/repository-contract'
import { DashboardEntity } from '../entities/dashboard.entity'

export interface DashboardRepository
  extends RepositoryInterface<DashboardEntity> {}
