import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { SettingService } from 'src/service/setting.service';
import { CreateSettingDto } from 'src/dto/create-setting.dto';
import { UpdateSettingDto } from 'src/dto/update-setting.dto';

@Controller('/api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(+id, updateSettingDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.settingService.remove(+id);
  }
}
