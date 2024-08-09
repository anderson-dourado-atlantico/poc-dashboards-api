import { DashboardType } from '@/modules/dashboard/domain/entities/dashboard-content.entity'
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator'

export class DashboardContentCreateDto {
  @IsString()
  name: string

  @IsString()
  alias: string

  @IsEnum(DashboardType)
  type: DashboardType

  @IsOptional()
  @IsString()
  folderParentId?: string

  @IsOptional()
  @IsUrl()
  embeddedLink?: string
}
