import { v4 as uuidv4 } from 'uuid'

export type EntityProps = {
  createdAt?: Date
  updatedAt?: Date
}

export class Entity<E = any> {
  public readonly props: E & EntityProps
  private readonly _id: string

  constructor(props: E & EntityProps, id?: string) {
    this.props = props
    this._id = id || uuidv4()
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.createdAt
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  toJSON(): Required<{ id: string } & E & EntityProps> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & E & EntityProps>
  }
}
