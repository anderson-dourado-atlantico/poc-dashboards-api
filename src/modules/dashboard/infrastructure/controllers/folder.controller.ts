import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { FolderService } from '../services/folder.service'
import { CreateFolderDto } from '../dto/create-folder.dto'
import { UpdateFolderDto } from '../dto/update-folder.dto'

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  findAll() {
    return this.folderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(+id)
  }

  @Post()
  create(@Body() createDashboardDto: CreateFolderDto) {
    return this.folderService.create(createDashboardDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateDashboardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id)
  }
}
