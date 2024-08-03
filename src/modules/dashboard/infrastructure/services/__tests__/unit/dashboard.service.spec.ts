import { Test, TestingModule } from '@nestjs/testing'
import { DashboardContentService } from '../../dashboard-content.service'
import { DashboardInMemoryRepository } from '../../../database/in-memory/repositories/dashboard.in-memory.repository'

describe('DashboardService', () => {
  let service: DashboardContentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardContentService,
        {
          provide: 'IDashboardContentRepository',
          useClass: DashboardInMemoryRepository,
        },
      ],
    }).compile()

    service = module.get<DashboardContentService>(DashboardContentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
