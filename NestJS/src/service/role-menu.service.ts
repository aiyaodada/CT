import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateRoleMenuDto } from 'src/dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from 'src/dto/update-role-menu.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RoleMenu } from 'src/entity/role-menu.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { REQUEST } from '@nestjs/core';


@Injectable({ scope: Scope.REQUEST })
export class RoleMenuService {
constructor(
  
  @Inject(REQUEST) private readonly request: Request
){}

  create(createRoleMenuDto: CreateRoleMenuDto) {
    return 'This action adds a new roleMenu';
  }

  findAll() {
    return `This action returns all roleMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleMenu`;
  }

  update(id: number, updateRoleMenuDto: UpdateRoleMenuDto) {
    return `This action updates a #${id} roleMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleMenu`;
  }

}
