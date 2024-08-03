import { Injectable, PipeTransform } from '@nestjs/common'
import { SortDto } from '../domain/repositories/dtos/sort.dto'

@Injectable()
export class MultSortPipe implements PipeTransform {
  transform(value: string | string[]): SortDto {
    if (!value) {
      return new SortDto()
    }

    if (!Array.isArray(value)) {
      value = [value]
    }

    return SortDto.toSortDto(value)
  }
}
