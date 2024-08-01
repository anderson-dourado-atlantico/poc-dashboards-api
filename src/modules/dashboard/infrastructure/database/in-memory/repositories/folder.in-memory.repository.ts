import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'
import { FolderFilter } from './filters/folder.in-memory.filter'
import { InMemorySortRepository } from '@/shared/domain/repositories/in-memory/in-memory.sort.repository'
import { FolderRepository } from '@/modules/dashboard/domain/repositories/folder.repository'

export class FolderInMemoryRepository
  extends InMemorySortRepository<FolderEntity, FolderFilter>
  implements FolderRepository {}
