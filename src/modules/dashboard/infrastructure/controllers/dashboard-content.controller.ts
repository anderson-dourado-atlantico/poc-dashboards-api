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
import { DashboardContentService } from '../services/dashboard-content.service'
import { FolderSearchDto } from './dtos/folder-search.dto'
import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'

@Controller('dashboards')
export class DashboardContentController {
  constructor(private readonly dashboardService: DashboardContentService) {}

  @Get()
  findAll(
    @Query() searchParams: FolderSearchDto,
    @Query('sort') sort: SortDto,
  ) {
    return this.dashboardService.search(searchParams, sort)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(id)
  }

  @Post('/include')
  includeFolders() {
    return this.dashboardService.incluirValoresIniciais()
  }

  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDashboardDto: UpdateDashboardDto,
  // ) {
  //   return this.dashboardService.update(+id, updateDashboardDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id)
  // }
}
