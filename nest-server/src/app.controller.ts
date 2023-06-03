import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
