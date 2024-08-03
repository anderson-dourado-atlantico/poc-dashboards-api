import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { FolderService } from '../services/folder.service'
import { FolderSearchDto } from './dtos/folder-search.dto'
import { SortParams } from '@/shared/domain/repositories/sort-repository-contract'
import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  findAll(
    @Query() searchParams: FolderSearchDto,
    @Query('sort') sort: SortDto,
  ) {
    return this.folderService.search(searchParams, sort)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(id)
  }

  @Post('/include')
  includeFolders() {
    return this.folderService.incluirValoresIniciais()
  }

  // @Post()
  // create(@Body() createDashboardDto: CreateFolderDto) {
  //   return this.folderService.create(createDashboardDto)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateFolderDto) {
  //   return this.folderService.update(id, updateDashboardDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.folderService.remove(id)
  // }
}
