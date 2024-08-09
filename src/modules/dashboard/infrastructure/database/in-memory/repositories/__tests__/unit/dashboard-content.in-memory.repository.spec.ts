import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'
import { FolderDataBuilder } from '@/modules/dashboard/domain/entities/__tests__/helpers/folder-data-builder'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { DashboardInMemoryRepository } from '../../dashboard.in-memory.repository'
import { DashboardContentFilter } from '../../filters/dashboard-content.in-memory.filter'
import { DashboardContentEntity } from '@/modules/dashboard/domain/entities/dashboard-content.entity'
import { DashboardItemEntity } from '@/modules/dashboard/domain/entities/dashboard.entity'
import { DashboardDataBuilder } from '@/modules/dashboard/domain/entities/__tests__/helpers/dashboard-data-builder'

describe('FolderInMemoryRepository unit tests', () => {
  let sut: DashboardInMemoryRepository

  beforeEach(() => {
    sut = new DashboardInMemoryRepository()
    sut.insert(new FolderEntity(FolderDataBuilder({ name: 'Operações' })))
    sut.insert(new FolderEntity(FolderDataBuilder({ name: 'Manutenção' })))
    sut.insert(
      new FolderEntity(FolderDataBuilder({ name: 'Loja', alias: 'loja' })),
    )
    sut.insert(
      new FolderEntity(FolderDataBuilder({ name: 'Operações Mistas' })),
    )
    sut.insert(
      new FolderEntity(FolderDataBuilder({ name: 'Operações Externas' })),
    )

    let entity = new FolderEntity(
      FolderDataBuilder({ name: 'Loja Especial', alias: 'loja' }),
    )

    sut.insert(entity)

    const content: DashboardContentEntity[] = [
      new FolderEntity(
        FolderDataBuilder({
          name: 'Loja 1 Teste',
          folderParentId: entity.id,
          alias: 'L Teste 1',
        }),
      ),
      new FolderEntity(
        FolderDataBuilder({
          name: 'Loja 2 Teste',
          folderParentId: entity.id,
          alias: 'L Teste 2',
        }),
      ),
      new DashboardItemEntity(
        DashboardDataBuilder({
          name: 'Dashboard Teste 1',
          folderParentId: entity.id,
          alias: 'Dashboard padrao',
        }),
      ),
      new DashboardItemEntity(
        DashboardDataBuilder({
          name: 'Avanço Dashboard Teste 2',
          folderParentId: entity.id,
          alias: 'Dashboard padrao',
        }),
      ),
    ]

    content.forEach(cont => {
      sut.insert(cont)
    })
  })

  it('Should filter by name', async () => {
    const filter = new DashboardContentFilter({
      name: 'OpE',
    })
    const filteredItems = await sut.search(filter)

    expect(filteredItems).toHaveLength(3)
  })

  it('Should filter by alias', async () => {
    const filter = new DashboardContentFilter({
      alias: 'ojA',
    })
    const filteredItems = await sut.search(filter)

    expect(filteredItems).toHaveLength(2)
  })

  it('Should filter by name and sort results by name', async () => {
    const filter = new DashboardContentFilter({
      name: 'OpE',
    })
    let sort = new SortParams({ field: ['props', 'name'] })
    let filteredItems = await sut.search(filter, sort)
    expect(filteredItems).toHaveLength(3)
    expect(filteredItems.map(item => item.props.name)).toStrictEqual([
      'Operações',
      'Operações Externas',
      'Operações Mistas',
    ])

    sort = new SortParams({ field: 'name', direction: 'desc' })
    filteredItems = await sut.search(filter, sort)

    expect(filteredItems).toHaveLength(3)
    expect(filteredItems.map(item => item.props.name)).toStrictEqual([
      'Operações Mistas',
      'Operações Externas',
      'Operações',
    ])
  })

  it('Should search by two sort factors', async () => {
    let filter = new DashboardContentFilter({
      name: 'Loja Especial',
    })
    const entity = (await sut.search(filter))[0]

    filter = new DashboardContentFilter({
      folderParentId: entity.id,
    })
    const sort = new SortParams({ field: 'type' }).addNext(
      new SortParams({ field: 'name' }),
    )
    const foundData = await sut.search(filter, sort)

    console.log(foundData.map(item => item.toJSON()))

    expect(foundData).toBeInstanceOf(Array)
    expect(foundData.map(item => item.name)).toStrictEqual([
      'Loja 1 Teste',
      'Loja 2 Teste',
      'Avanço Dashboard Teste 2',
      'Dashboard Teste 1',
    ])
  })
})
