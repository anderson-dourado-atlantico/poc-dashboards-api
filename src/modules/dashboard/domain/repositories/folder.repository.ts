import { FolderEntity } from '../entities/folder.entity'
import { SortRepository } from '@/shared/domain/repositories/sort-repository-contract'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export interface FolderRepository
  extends SortRepository<FolderEntity, FilterBase<FolderEntity>> {}
