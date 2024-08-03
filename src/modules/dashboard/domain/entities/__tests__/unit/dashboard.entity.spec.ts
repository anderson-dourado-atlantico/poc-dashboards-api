import { DashboardType } from '../../dashboard-content.entity'
import { DashboardItemEntity, DashboardItemProps } from '../../dashboard.entity'
import { DashboardDataBuilder } from '../helpers/dashboard-data-builder'

describe('DashboardEntity unit tests', () => {
  let props: DashboardItemProps
  let sut: DashboardItemEntity

  beforeEach(() => {
    props = DashboardDataBuilder({})
    sut = new DashboardItemEntity(props)
  })

  it('Testando metodo construtor', () => {
    expect(sut.id).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.alias).toEqual(props.alias)
    expect(sut.props.type).toEqual(props.type)
    expect(sut.props.type).toEqual(DashboardType.ITEM)
    expect(sut.props.folderParentId).toEqual(props.folderParentId)
    expect(sut.props.embeddedLink).toEqual(props.embeddedLink)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(sut.props.updatedAt).toBeInstanceOf(Date)
  })
})
