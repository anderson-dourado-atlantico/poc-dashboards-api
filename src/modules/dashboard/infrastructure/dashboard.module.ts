import { Module } from '@nestjs/common'
import { DashboardController } from './controllers/dashboard.controller'
import { FolderService } from './services/folder.service'
import { DashboardService } from './services/dashboard.service'
import { FolderController } from './controllers/folder.controller'
import { FolderInMemoryRepository } from './database/in-memory/repositories/folder.in-memory.repository'
import { DashboardInMemoryRepository } from './database/in-memory/repositories/dashboard.in-memory.repository'

@Module({
  controllers: [DashboardController, FolderController],
  providers: [
    { provide: 'IFolderRepository', useClass: FolderInMemoryRepository },
    { provide: 'IDashboardRepository', useClass: DashboardInMemoryRepository },
    DashboardService,
    FolderService,
  ],
})
export class DashboardModule {}
