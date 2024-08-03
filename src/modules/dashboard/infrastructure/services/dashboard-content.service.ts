import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'
import { Inject, Injectable } from '@nestjs/common'
import { FolderSearchDto } from '../controllers/dtos/folder-search.dto'
import { IDashboardContentRepository } from '../../domain/repositories/dashboard-content.repository'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { DashboardContentFilter } from '../database/in-memory/repositories/filters/dashboard-content.in-memory.filter'
import { DashboardContentEntity } from '../../domain/entities/dashboard-content.entity'

@Injectable()
export class DashboardContentService {
  @Inject('IDashboardContentRepository')
  private readonly dashboardRepository: IDashboardContentRepository

  constructor() {}

  incluirValoresIniciais() {
    // throw new Error('Method not implemented.')
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
