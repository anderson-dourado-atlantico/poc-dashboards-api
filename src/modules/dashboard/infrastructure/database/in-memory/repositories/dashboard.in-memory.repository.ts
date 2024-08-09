import { IDashboardContentRepository } from '@/modules/dashboard/domain/repositories/dashboard-content.repository'
import { InMemorySortRepository } from '@/shared/infrastructure/domain/repositories/in-memory/in-memory.sort.repository'
import { DashboardContentFilter } from './filters/dashboard-content.in-memory.filter'
import { DashboardContentEntity } from '@/modules/dashboard/domain/entities/dashboard-content.entity'
import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'

export class DashboardInMemoryRepository
  extends InMemorySortRepository<DashboardContentEntity, DashboardContentFilter>
  implements IDashboardContentRepository {
  // async insert(entity: DashboardContentEntity): Promise<void> {
  //   if (entity.folderParentId) {
  //     const newEntity = await this.findById(entity.folderParentId)
  //     if (newEntity instanceof FolderEntity) {
  //       newEntity.addContent(entity)
  //     }
  //   }
  //   await super.insert(entity)
  // }
}
