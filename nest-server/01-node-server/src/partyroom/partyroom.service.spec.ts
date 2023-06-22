import { Test, TestingModule } from '@nestjs/testing';
import { PartyroomService } from './partyroom.service';

describe('PartyroomService', () => {
  let service: PartyroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartyroomService],
    }).compile();

    service = module.get<PartyroomService>(PartyroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
