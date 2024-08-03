import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'
import { Inject, Injectable } from '@nestjs/common'
import { FolderSearchDto } from '../controllers/dtos/folder-search.dto'
import { IDashboardContentRepository } from '../../domain/repositories/dashboard-content.repository'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { DashboardContentFilter } from '../database/in-memory/repositories/filters/dashboard-content.in-memory.filter'
import {
  DashboardContentEntity,
  DashboardContentProps,
  DashboardType,
} from '../../domain/entities/dashboard-content.entity'
import { FolderEntity } from '../../domain/entities/folder.entity'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, ms),
  )
}

@Injectable()
export class DashboardContentService {
  @Inject('IDashboardContentRepository')
  private readonly dashboardRepository: IDashboardContentRepository

  constructor() {}

  async incluirValoresIniciais() {
    const folderPropsList: DashboardContentProps[] = [
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
      await this.dashboardRepository.insert(new FolderEntity(props))
      await sleep(1000)
    })

    // Operações
    let dashContent = await this.dashboardRepository.search(
      new DashboardContentFilter({ name: 'Operação' }),
      new SortParams({ field: 'name', direction: 'asc' }),
    )

    const folderPropsOperacaoList: DashboardContentProps[] = [
      {
        name: 'Operação de Sensores',
        alias: 'Ope Sensores',
        folderParentId: dashContent[0].id,
        type: DashboardType.FOLDER,
      },
      {
        name: 'Operação Regular',
        alias: 'Ope Regular',
        folderParentId: dashContent[0].id,
        type: DashboardType.FOLDER,
      },
    ]

    folderPropsOperacaoList.forEach(async props => {
      await this.dashboardRepository.insert(new FolderEntity(props))
      await sleep(1000)
    })

    return `Folders incluidos com sucesso!!`
  }

  async search(
    searchParams: FolderSearchDto,
    sort?: SortDto,
  ): Promise<DashboardContentEntity[]> {
    const filter = new DashboardContentFilter({ ...searchParams })
    if (!sort || !sort.field) {
      sort = new SortDto()
      sort.field = 'name'
    }

    return this.dashboardRepository.search(filter, this.toSort(sort))
  }

  findAll() {
    return this.dashboardRepository.findAll()
  }

  findOne(id: string) {
    return this.dashboardRepository.findById(id)
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

  // create(createDashboardDto: CreateDashboardDto) {
  //   return 'This action adds a new dashboard'
  // }

  // update(id: number, updateDashboardDto: UpdateDashboardDto) {
  //   return `This action updates a #${id} dashboard`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} dashboard`
  //}
}
