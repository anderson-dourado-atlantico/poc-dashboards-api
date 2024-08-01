import { FolderEntity } from '@/modules/dashboard/domain/entities/folder.entity'
import { FolderFilter } from '../../filters/folder.in-memory.filter'
import { FolderInMemoryRepository } from '../../folder.in-memory.repository'
import { FolderDataBuilder } from '@/modules/dashboard/domain/entities/__tests__/helpers/folder-data-builder'

describe('FolderInMemoryRepository unit tests', () => {
  let sut: FolderInMemoryRepository

  beforeEach(() => {
    sut = new FolderInMemoryRepository()
    sut.insert(new FolderEntity(FolderDataBuilder({ name: 'Operações' })))
    sut.insert(new FolderEntity(FolderDataBuilder({ name: 'Manutenção' })))
    sut.insert(
      new FolderEntity(FolderDataBuilder({ name: 'Loja', alias: 'loja' })),
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
    const filter = new FolderFilter({
      name: 'oja',
    })
    const filteredItems = await sut.search(filter)

    console.log(filteredItems)
  })

  it('Should filter by alias', async () => {
    const filter = new FolderFilter({
      alias: 'OpE',
    })
    const filteredItems = await sut.search(filter)

    console.log(filteredItems)
  })
})
