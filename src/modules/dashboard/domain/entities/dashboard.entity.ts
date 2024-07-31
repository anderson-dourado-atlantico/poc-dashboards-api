import { Entity, EntityProps } from '@/shared/domain/entities/entity'

export type DashboardProps = {
  folderId: string
  name: string
  alias: string
  embeddedLink: string
} & EntityProps

export class DashboardEntity extends Entity<DashboardProps> {
  constructor(
    public readonly props: DashboardProps,
    id?: string,
  ) {
    super(props, id)
  }
}
