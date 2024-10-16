import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { RoleMenuService } from 'src/service/role-menu.service';
import { CreateRoleMenuDto } from 'src/dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from 'src/dto/update-role-menu.dto';

@Controller('/api/role-menu')
export class RoleMenuController {
  constructor(private readonly roleMenuService: RoleMenuService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createRoleMenuDto: CreateRoleMenuDto) {
    return this.roleMenuService.create(createRoleMenuDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.roleMenuService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.roleMenuService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateRoleMenuDto: UpdateRoleMenuDto) {
    return this.roleMenuService.update(+id, updateRoleMenuDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.roleMenuService.remove(+id);
  }
}
