import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'
import { FolderRepository } from '@/modules/dashboard/domain/repositories/folder.repository'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory/in-memory.repository'

export class FolderInMemoryRepository
  extends InMemoryRepository<FolderEntity>
  implements FolderRepository {}
