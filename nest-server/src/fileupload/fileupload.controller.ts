import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { SubmitRawRoomDto, SubmitRoomDto } from './dto/submit-room.dto';
import { FileUploadService } from './fileupload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/submit_room')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/rooms',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalNameNoExt = file.originalname.replace(/\.[^/.]+$/, '');
          const generatedFilename = `${originalNameNoExt}-${uniqueSuffix}${extname(
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
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() imgFiles: Array<Express.Multer.File>,
    @Body() formData: SubmitRawRoomDto,
  ) {
    const imgFilenameArr = imgFiles.map((img) => img.filename);

    console.log(
      'checking price list total hour',
      JSON.parse(formData.price_list),
    );
    const treatedFormData: SubmitRoomDto = {
      name: formData.name,
      host_id: parseInt(formData.host_id),
      address: formData.address,
      capacity: parseInt(formData.capacity),
      district_id: parseInt(formData.district),
      room_size: parseInt(formData.room_size),
      phone: parseInt(formData.phone),
      description: formData.description,
      is_hidden: formData.is_hidden === 'true',
      category_id: JSON.parse(formData.category_id),
      equipment_id: JSON.parse(formData.equipment_id),
      price_list: JSON.parse(formData.price_list),
      images: imgFilenameArr,
    };
    await this.fileUploadService.uploadFiles(treatedFormData);
    return { message: 'Partyroom successfully uploaded' };
  }
}
