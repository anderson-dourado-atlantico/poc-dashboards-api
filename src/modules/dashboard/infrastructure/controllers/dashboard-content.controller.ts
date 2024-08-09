import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common'
import { DashboardContentService } from '../services/dashboard-content.service'
import { FolderSearchDto } from './dtos/folder-search.dto'
import { SortDto } from '@/shared/infrastructure/domain/repositories/dtos/sort.dto'
import { DashboardContentPresenter } from './presenters/dashboard-content.presenter'
import {
  DashboardItemEntity,
  DashboardItemProps,
} from '../../domain/entities/dashboard.entity'
import {
  DashboardContentEntity,
  DashboardContentProps,
} from '../../domain/entities/dashboard-content.entity'
import { DashboardContentCreateDto } from './dtos/dashboard-content-create.dto'

@Controller('dashboards')
export class DashboardContentController {
  constructor(private readonly dashboardService: DashboardContentService) {}

  @Get()
  findAll(
    @Query() searchParams: FolderSearchDto,
    @Query('sort') sort: SortDto,
  ): Promise<DashboardContentPresenter[]> {
    return this.dashboardService
      .search(searchParams, sort)
      .then(result => result.map(item => new DashboardContentPresenter(item)))
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<DashboardContentEntity> {
    return this.dashboardService.findOne(id)
  }

  @Get('access/:id')
  async accessContent(
    @Param('id') id: string,
  ): Promise<DashboardContentPresenter[]> {
    return this.dashboardService
      .acessarConteudo(id)
      .then(result => result.map(item => new DashboardContentPresenter(item)))
  }

  @Post()
  async incluirNovoConteudo(
    @Body() novoConteudo: DashboardContentCreateDto,
  ): Promise<void> {
    return this.dashboardService.adicionarDashboardContent({
      ...novoConteudo,
    } as DashboardItemProps)
  }

  @Put('/:id')
  async atualizarDados(
    @Body() novoConteudo: DashboardContentCreateDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.dashboardService.atualizarDashboardContent(id, {
      ...novoConteudo,
    } as DashboardItemProps)
  }

  @Post('include')
  includeInitialValues() {
    return this.dashboardService.includeInitialValues()
  }
}
