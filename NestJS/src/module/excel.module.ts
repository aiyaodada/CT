import { Module } from '@nestjs/common';
import { ExcelService } from 'src/service/excel.service';

@Module({
  providers: [ExcelService],
  exports: [ExcelService],
})
export class ExcelModule {}
