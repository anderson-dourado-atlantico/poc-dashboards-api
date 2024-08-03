import { Module } from '@nestjs/common'
import { DashboardContentController } from './controllers/dashboard-content.controller'
import { FolderService } from './services/folder.service'
import { DashboardContentService } from './services/dashboard-content.service'
import { FolderController } from './controllers/folder.controller'
import { FolderInMemoryRepository } from './database/in-memory/repositories/folder.in-memory.repository'
import { DashboardInMemoryRepository } from './database/in-memory/repositories/dashboard.in-memory.repository'

@Module({
  controllers: [DashboardContentController, FolderController],
  providers: [
    { provide: 'IFolderRepository', useClass: FolderInMemoryRepository },
    {
      provide: 'IDashboardContentRepository',
      useClass: DashboardInMemoryRepository,
    },
    DashboardContentService,
    FolderService,
  ],
})
export class DashboardModule {}
