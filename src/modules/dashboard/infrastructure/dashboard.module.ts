import { Module } from '@nestjs/common'
import { DashboardController } from './controllers/dashboard.controller'
import { FolderService } from './services/folder.service'
import { DashboardService } from './services/dashboard.service'
import { FolderController } from './controllers/folder.controller'

@Module({
  controllers: [DashboardController, FolderController],
  providers: [DashboardService, FolderService],
})
export class DashboardModule {}
