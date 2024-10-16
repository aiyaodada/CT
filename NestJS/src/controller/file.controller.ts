import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Query, HttpCode } from '@nestjs/common';
import { FileService } from 'src/service/file.service';
import { CreateFileDto } from 'src/dto/create-file.dto';
import { UpdateFileDto } from 'src/dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'src/entity/file.entity';

@Controller('/api/file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post("/")
  @UseInterceptors(FileInterceptor("file"))
  @HttpCode(200)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return await this.fileService.uploadFile(file, createFileDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query() file: File) {
    return this.fileService.findAll(file);
  }

  @Get('/public')
  @HttpCode(200)
  findAllPublic(@Query() file: File) {
    return this.fileService.findAllPublic(file);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: number) {
    return this.fileService.remove(+id);
  }
}
