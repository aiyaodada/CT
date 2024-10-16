// 
import { PartialType } from '@nestjs/swagger';
import { Folder } from 'src/entity/folder.entity';

export class findAllFolderDto extends PartialType(Folder) {
    
}