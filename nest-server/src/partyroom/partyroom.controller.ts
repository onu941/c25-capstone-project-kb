import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartyroomService } from './partyroom.service';
import { CreatePartyroomDto } from './dto/create-partyroom.dto';
import { UpdatePartyroomDto } from './dto/update-partyroom.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';

@Controller('partyroom')
export class PartyroomController {
  constructor(private readonly partyroomService: PartyroomService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createPartyroomDto: CreatePartyroomDto,
  ) {
    return {
      id: await this.partyroomService.create(createPartyroomDto),
    };
  }

  @Get()
  async findAll() {
    return { partyrooms: await this.partyroomService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { partyroom: await this.partyroomService.findOne(+id) };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePartyroomDto: UpdatePartyroomDto,
  ) {
    await this.partyroomService.update(+id, updatePartyroomDto);
    return { message: `Partyroom with ID ${id} updated` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.partyroomService.remove(+id);
    return { message: `Partyroom with ID ${id} removed` };
  }
}
