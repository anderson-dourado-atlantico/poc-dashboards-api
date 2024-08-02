import { FolderEntity } from '../entities/folder.entity'
import { ISortRepository } from '@/shared/domain/repositories/sort-repository-contract'
import { FilterBase } from '@/shared/domain/repositories/filter-base-contract'

export interface IFolderRepository
  extends ISortRepository<FolderEntity, FilterBase<FolderEntity>> {}
