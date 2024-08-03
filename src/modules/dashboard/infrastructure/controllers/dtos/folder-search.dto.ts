import { IsOptional, IsString } from 'class-validator'

export class FolderSearchDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  alias?: string

  @IsOptional()
  @IsString()
  folderParentId?: string
}
