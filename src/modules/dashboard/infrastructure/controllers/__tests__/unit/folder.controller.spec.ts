import { Test, TestingModule } from '@nestjs/testing'

import { FolderController } from '../../folder.controller'
import { FolderService } from '../../../services/folder.service'
import { FolderInMemoryRepository } from '../../../database/in-memory/repositories/folder.in-memory.repository'

describe('FolderController unit tests', () => {
  let controller: FolderController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolderController],
      providers: [
        { provide: 'IFolderRepository', useClass: FolderInMemoryRepository },
        FolderService,
      ],
    }).compile()

    controller = module.get<FolderController>(FolderController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
