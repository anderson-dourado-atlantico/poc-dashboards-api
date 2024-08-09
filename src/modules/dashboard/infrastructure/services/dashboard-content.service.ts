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
import {
  DashboardItemEntity,
  DashboardItemProps,
} from '../../domain/entities/dashboard.entity'

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

  async includeInitialValues() {
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

    let parentFolderId = dashContent[0].id
    const folderPropsOperacaoList: DashboardContentProps[] = [
      {
        name: 'Operação de Sensores',
        alias: 'Ope Sensores',
        folderParentId: parentFolderId,
        type: DashboardType.FOLDER,
      },
      {
        name: 'Operação Regular',
        alias: 'Ope Regular',
        folderParentId: parentFolderId,
        type: DashboardType.FOLDER,
      },
      {
        name: 'Operação Loca Web - Teste',
        alias: 'Teste Loca - W',
        folderParentId: parentFolderId,
        type: DashboardType.ITEM,
        embeddedLink:
          'https://www.locaweb.com.br/blog/wp-content/uploads/2023/07/dashboard-01.jpg',
      } as DashboardItemProps,
    ]

    folderPropsOperacaoList.forEach(async props => {
      const content =
        props['embeddedLink'] !== undefined
          ? new DashboardItemEntity(props)
          : new FolderEntity(props)
      await this.dashboardRepository.insert(content)
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

  async findOne(id: string) {
    return await this.dashboardRepository.findById(id)
  }

  async acessarConteudo(id: string): Promise<DashboardContentEntity[]> {
    const entity = await this.dashboardRepository.findById(id)

    let filter = new DashboardContentFilter({
      folderParentId: entity.id,
    })
    const sort = new SortParams({ field: 'type' }).addNext(
      new SortParams({ field: 'name' }),
    )

    return this.dashboardRepository.search(filter, sort)
  }

  async adicionarDashboardContent(props: DashboardItemProps) {
    return this.dashboardRepository.insert(new DashboardContentEntity(props))
  }

  async atualizarDashboardContent(
    id: string,
    props: DashboardItemProps,
  ): Promise<void> {
    return this.dashboardRepository.update(
      new DashboardContentEntity(props, id),
    )
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
        sortParam.addNext(
          new SortParams({ field: sort.field, direction: sort.direction }),
        )

        sortParam = sortParam.next
      }
    }

    return primeiroSortParam
  }
}
