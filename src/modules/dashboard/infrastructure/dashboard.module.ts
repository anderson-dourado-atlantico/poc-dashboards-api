import { Module } from '@nestjs/common'
import { DashboardContentController } from './controllers/dashboard-content.controller'
import { DashboardContentService } from './services/dashboard-content.service'
import { DashboardInMemoryRepository } from './database/in-memory/repositories/dashboard.in-memory.repository'

@Module({
  controllers: [DashboardContentController],
  providers: [
    {
      provide: 'IDashboardContentRepository',
      useClass: DashboardInMemoryRepository,
    },
    DashboardContentService,
  ],
})
export class DashboardModule {}
