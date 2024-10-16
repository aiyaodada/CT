import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { MenuService } from 'src/service/menu.service';
import { CreateMenuDto } from 'src/dto/create-menu.dto';
import { UpdateMenuDto } from 'src/dto/update-menu.dto';

@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
