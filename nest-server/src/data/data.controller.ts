import { Controller, Get, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('data')
export class DataController {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) {}

  @Get('/etl_data')
  @UseGuards(AuthGuard('jwt'))
  async fetchData() {
    return await this.dataService.fetchData();
  }
}
