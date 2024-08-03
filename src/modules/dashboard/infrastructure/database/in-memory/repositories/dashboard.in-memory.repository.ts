import { IDashboardContentRepository } from '@/modules/dashboard/domain/repositories/dashboard-content.repository'
import { InMemorySortRepository } from '@/shared/domain/repositories/in-memory/in-memory.sort.repository'
import { DashboardContentFilter } from './filters/dashboard-content.in-memory.filter'
import { DashboardContentEntity } from '@/modules/dashboard/domain/entities/dashboard-content.entity'

export class DashboardInMemoryRepository
  extends InMemorySortRepository<DashboardContentEntity, DashboardContentFilter>
  implements IDashboardContentRepository {}
