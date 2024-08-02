import { Inject, Injectable } from '@nestjs/common'
import { CreateFolderDto } from '../controllers/dtos/create-folder.dto'
import { UpdateFolderDto } from '../controllers/dtos/update-folder.dto'
import { IFolderRepository } from '../../domain/repositories/folder.repository'
import { FolderEntity, FolderProps } from '../../domain/entities/folder.entity'
import { FolderSearchDto } from '../controllers/dtos/folder-search.dto'
import { FolderFilter } from '../database/in-memory/repositories/filters/folder.in-memory.filter'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, ms),
  )
}

@Injectable()
export class FolderService {
  @Inject('IFolderRepository')
  private readonly folderRepository: IFolderRepository

  constructor() {}

  async incluirValoresIniciais() {
    const folderPropsList: FolderProps[] = [
      { name: 'Operação', alias: 'Operação', folderParentId: null },
      { name: 'Manutenção', alias: 'Manutenção', folderParentId: null },
      { name: 'Sensor', alias: 'Sensor', folderParentId: null },
    ]

    folderPropsList.forEach(async props => {
      await this.folderRepository.insert(new FolderEntity(props))
      await sleep(1000)
    })

    // Operações
    let folderEntity = await this.folderRepository.findAll()
    const folderPropsOperacaoList: FolderProps[] = [
      {
        name: 'Operação de Sensores',
        alias: 'Ope Sensores',
        folderParentId: folderEntity[0].id,
      },
      {
        name: 'Operação Regular',
        alias: 'Ope Regular',
        folderParentId: folderEntity[0].id,
      },
    ]

    folderPropsOperacaoList.forEach(async props => {
      await this.folderRepository.insert(new FolderEntity(props))
      await sleep(1000)
    })

    return `Folders incluidos com sucesso!!`
  }

  async search(
    searchParams: FolderSearchDto,
    sort?: SortParams,
  ): Promise<FolderEntity[]> {
    const filter = new FolderFilter({ ...searchParams })
    if (!sort || !sort.field) {
      sort = { field: 'name' }
    }

    return this.folderRepository.search(filter, sort)
  }

  create(createFolderDto: CreateFolderDto) {
    return 'This action adds a new folder'
  }

  findAll() {
    return this.folderRepository.findAll()
  }

  findOne(id: string) {
    return this.folderRepository.findById(id)
  }

  update(id: string, updateFolderDto: UpdateFolderDto) {
    return `updating a folder`
  }

  remove(id: string) {
    return `This action removes a #${id} folder`
  }
}
