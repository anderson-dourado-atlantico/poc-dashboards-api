import { DashboardEntity, DashboardProps } from '../../dashboard.entity'
import { DashboardDataBuilder } from '../helpers/dashboard-data-builder'

describe('DashboardEntity unit tests', () => {
  let props: DashboardProps
  let sut: DashboardEntity

  beforeEach(() => {
    props = DashboardDataBuilder({})
    sut = new DashboardEntity(props)
  })

  it('Testando metodo construtor', () => {
    expect(sut.id).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.alias).toEqual(props.alias)
    expect(sut.props.folderId).toEqual(props.folderId)
    expect(sut.props.embeddedLink).toEqual(props.embeddedLink)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(sut.props.updatedAt).toBeInstanceOf(Date)
  })
})
