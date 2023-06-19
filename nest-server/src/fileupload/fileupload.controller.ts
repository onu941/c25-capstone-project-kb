import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SubmitRoomDto } from './dto/submit-room.dto';
import { FileUploadService } from './fileupload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('fileupload')
@UseGuards(AuthGuard('jwt'))
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/submit_room')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const generatedFilename = `${file.fieldname}-${uniqueSuffix}${extname(
            file.originalname,
          )}`;
          callback(null, generatedFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Unsupported file type'), false);
        }
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() formData: SubmitRoomDto,
  ) {
    await this.fileUploadService.uploadFiles(files, formData);
    return { message: 'Partyroom successfully uploaded' };
  }
}
