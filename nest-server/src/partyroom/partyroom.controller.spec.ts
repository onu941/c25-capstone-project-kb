import { Test, TestingModule } from '@nestjs/testing';
import { PartyroomController } from './partyroom.controller';
import { PartyroomService } from './partyroom.service';

describe('PartyroomController', () => {
  let controller: PartyroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyroomController],
      providers: [PartyroomService],
    }).compile();

    controller = module.get<PartyroomController>(PartyroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
