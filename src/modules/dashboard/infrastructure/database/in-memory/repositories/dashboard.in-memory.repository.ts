import { DashboardEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'
import { DashboardRepository } from '@/modules/dashboard/domain/repositories/dashboard.repository'
import { InMemorySortRepository } from '@/shared/domain/repositories/in-memory/in-memory.sort.repository'
import { DashboardFilter } from './filters/dashboard.in-memory.filter'

export class DashboardInMemoryRepository
  extends InMemorySortRepository<DashboardEntity, DashboardFilter>
  implements DashboardRepository {}
