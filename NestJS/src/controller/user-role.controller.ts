import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserRoleService } from 'src/service/user-role.service';
import { CreateUserRoleDto } from 'src/dto/create-user-role.dto';
import { UpdateUserRoleDto } from 'src/dto/update-user-role.dto';

@Controller('/api/user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
