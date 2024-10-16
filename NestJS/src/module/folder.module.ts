import { Module } from '@nestjs/common';
import { FolderService } from 'src/service/folder.service';
import { FolderController } from 'src/controller/folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from 'src/entity/folder.entity';

@Module({
  controllers: [FolderController],
  providers: [FolderService],
  imports: [TypeOrmModule.forFeature([Folder])],
  exports: [TypeOrmModule, FolderService]
})
export class FolderModule { }
