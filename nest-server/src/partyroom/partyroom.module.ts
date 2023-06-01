import { Module } from '@nestjs/common';
import { PartyroomService } from './partyroom.service';
import { PartyroomController } from './partyroom.controller';

@Module({
  controllers: [PartyroomController],
  providers: [PartyroomService]
})
export class PartyroomModule {}
