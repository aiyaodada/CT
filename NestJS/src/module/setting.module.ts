import { Module } from '@nestjs/common';
import { SettingService } from 'src/service/setting.service';
import { SettingController } from 'src/controller/setting.controller';

@Module({
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
