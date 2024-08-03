import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'
import { FolderDataBuilder } from '@/modules/dashboard/domain/entities/__tests__/helpers/folder-data-builder'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { DashboardInMemoryRepository } from '../../dashboard.in-memory.repository'
import { DashboardContentFilter } from '../../filters/dashboard-content.in-memory.filter'

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
    sut.insert(
      new FolderEntity(
        FolderDataBuilder({ name: 'Loja Especial', alias: 'loja' }),
      ),
    )
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
})
