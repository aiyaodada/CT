import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { RoleService } from 'src/service/role.service';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import { NoAuth } from 'src/guard/auth.guard';

@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @NoAuth()
  @HttpCode(200)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
