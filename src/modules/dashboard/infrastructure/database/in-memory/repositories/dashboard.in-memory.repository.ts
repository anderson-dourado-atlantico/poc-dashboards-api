import { DashboardEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'
import { DashboardRepository } from '@/modules/dashboard/domain/repositories/dashboard.repository'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory/in-memory.repository'

export class DashboardInMemoryRepository
  extends InMemoryRepository<DashboardEntity>
  implements DashboardRepository {}
