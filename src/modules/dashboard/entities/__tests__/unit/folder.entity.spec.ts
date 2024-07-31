import { fakeUUID } from '@/shared/domain/entities/__tests__/helpers/helpers'
import { FolderEntity, FolderProps } from '../../folder.entity'
import { FolderDataBuilder } from '../helpers/folder-data-builder'

describe('FolderEntity unit tests', () => {
  let props: FolderProps
  let sut: FolderEntity

  beforeEach(() => {
    props = FolderDataBuilder({ folderParentId: fakeUUID() })
    sut = new FolderEntity(props)
  })

  it('Testando metodo construtor', () => {
    expect(sut.id).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.alias).toEqual(props.alias)
    expect(sut.props.folderParentId).toEqual(props.folderParentId)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(sut.props.updatedAt).toBeInstanceOf(Date)
  })

  it('Testando se folderParentId pode ser undefined', () => {
    props = FolderDataBuilder({ folderParentId: undefined })
    sut = new FolderEntity(props)

    expect(sut.props.folderParentId).toBeUndefined()
  })
})
