import { Inject, Injectable } from '@nestjs/common'
import { CreateFolderDto } from '../controllers/dtos/create-folder.dto'
import { UpdateFolderDto } from '../controllers/dtos/update-folder.dto'
import { IFolderRepository } from '../../domain/repositories/folder.repository'
import { FolderEntity, FolderProps } from '../../domain/entities/folder.entity'
import { FolderSearchDto } from '../controllers/dtos/folder-search.dto'
import { FolderFilter } from '../database/in-memory/repositories/filters/folder.in-memory.filter'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'
import { DashboardType } from '../../domain/entities/dashboard-content.entity'

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
      {
        name: 'Operação',
        alias: 'Operação',
        folderParentId: null,
        type: DashboardType.FOLDER,
      },
      {
        name: 'Manutenção',
        alias: 'Manutenção',
        folderParentId: null,
        type: DashboardType.FOLDER,
      },
      {
        name: 'Sensor',
        alias: 'Sensor',
        folderParentId: null,
        type: DashboardType.FOLDER,
      },
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
        type: DashboardType.FOLDER,
      },
      {
        name: 'Operação Regular',
        alias: 'Ope Regular',
        folderParentId: folderEntity[0].id,
        type: DashboardType.FOLDER,
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
    sort?: SortDto,
  ): Promise<FolderEntity[]> {
    const filter = new FolderFilter({ ...searchParams })
    if (!sort || !sort.field) {
      sort = new SortDto()
      sort.field = 'name'
    }

    return this.folderRepository.search(filter, this.toSort(sort))
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

  private toSort(sort: SortDto): SortParams {
    let sortDtoAtual = sort
    let sortParam = new SortParams({
      field: sort.field,
      direction: sort.direction,
    })
    const primeiroSortParam = sortParam
    while (sortDtoAtual != null) {
      sortDtoAtual = sortDtoAtual.next

      if (sortDtoAtual && sortDtoAtual.field) {
        sortParam = sortParam.addNext(
          new SortParams({ field: sort.field, direction: sort.direction }),
        )
      }
    }

    return primeiroSortParam
  }
}
