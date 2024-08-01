import { RepositoryInterface } from '@/shared/domain/repositories/repository-contract'
import { FolderEntity } from '../entities/folder.entity'

export interface FolderRepository extends RepositoryInterface<FolderEntity> {}
