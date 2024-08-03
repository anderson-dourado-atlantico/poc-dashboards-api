import { Test, TestingModule } from '@nestjs/testing'
import { DashboardContentController } from '../../dashboard-content.controller'
import { DashboardContentService } from '../../../services/dashboard-content.service'
import { DashboardInMemoryRepository } from '../../../database/in-memory/repositories/dashboard.in-memory.repository'

describe('DashboardContentController unit tests', () => {
  let controller: DashboardContentController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardContentController],
      providers: [
        DashboardContentService,
        {
          provide: 'IDashboardContentRepository',
          useClass: DashboardInMemoryRepository,
        },
      ],
    }).compile()

    controller = module.get<DashboardContentController>(
      DashboardContentController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
