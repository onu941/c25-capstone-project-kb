import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PartyroomModule } from './partyroom/partyroom.module';

@Module({
  imports: [UserModule, PartyroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
