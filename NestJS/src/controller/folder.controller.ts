import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, ExecutionContext, HttpCode } from '@nestjs/common';
import { FolderService } from 'src/service/folder.service';
import { CreateFolderDto } from 'src/dto/create-folder.dto';
import { UpdateFolderDto } from 'src/dto/update-folder.dto';
import { Folder } from 'src/entity/folder.entity';

@Controller('/api/folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) { }

  @Post()
  @HttpCode(200)
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query() folder: Folder) {
    return this.folderService.findAll(folder);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: number) {
    return this.folderService.remove(+id);
  }
}
