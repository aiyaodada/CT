import { Module } from '@nestjs/common';
import { FileService } from 'src/service/file.service';
import { FileController } from 'src/controller/file.controller';
import { File } from 'src/entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from 'src/entity/folder.entity';
import { FolderModule } from './folder.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [TypeOrmModule.forFeature([File, Folder]), FolderModule],
  exports: [TypeOrmModule, FileService]
})
export class FileModule { }
