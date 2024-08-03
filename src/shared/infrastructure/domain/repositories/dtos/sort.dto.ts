import { SortDirection } from '../../../../domain/repositories/sort-repository-contract'
import { IsObject, IsOptional, IsString } from 'class-validator'

export class SortDto {
  @IsOptional()
  @IsString()
  field?: string | null = null

  @IsOptional()
  @IsString()
  direction?: SortDirection = 'asc'

  @IsOptional()
  @IsObject()
  next?: SortDto | null = null

  static toSortDto(value: string[]): SortDto {
    let sortDtoAtual: SortDto
    let primeiroSortDto: SortDto

    value.forEach(val => {
      if (!sortDtoAtual) {
        sortDtoAtual = new SortDto()
        primeiroSortDto = sortDtoAtual
      } else {
        sortDtoAtual.next = new SortDto()
        sortDtoAtual = sortDtoAtual.next
      }

      let [field, direction] = val.split(',')
      if (!direction) direction = 'asc'
      else direction = direction === 'desc' ? direction : 'asc'

      sortDtoAtual.field = field
      sortDtoAtual.direction = direction as SortDirection
    })

    return primeiroSortDto
  }
}
