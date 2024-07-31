import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DashboardModule } from './modules/dashboard/infrastructure/dashboard.module'

@Module({
  imports: [DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
