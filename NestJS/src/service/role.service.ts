import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { RoleMenu } from 'src/entity/role-menu.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { ResponseResult } from 'src/utils/response.result';
import { REQUEST } from '@nestjs/core';


@Injectable({ scope: Scope.REQUEST })
export class RoleService implements OnModuleInit {


  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    
    @Inject(REQUEST) private readonly request: Request
  ) {
  }


  async getRoleByUserId(userId: number) {
    let roleName = await this.roleRepository.createQueryBuilder()
      .leftJoinAndSelect(UserRole, 'userRole', `role.id = userRole.roleId`)
      .where("userRole.userId = :userId", { "userId": userId })
      .andWhere("userRole.isDelete = 0")
      .select([
        `role.name as roleName`,
      ])
      .getRawMany();
    let roleNames = roleName.map((v) => v.roleName);
    return roleNames;
  }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      select: ['id', 'name']
    });
    return ResponseResult.okResult('Roles', roles);
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  // 初始化数据
  async onModuleInit() {
    const data = [
      { id: 1, name: "超级管理员" },
      { id: 2, name: "管理员" },
      { id: 3, name: "编辑" },
      { id: 4, name: "创作者" },
      { id: 5, name: "用户" }
    ]
    for (const role of data) {
      const entity = await this.roleRepository.findOne({ where: { id: role.id } });
      if (!entity) {
        const item = await this.roleRepository.create(role);
        await this.roleRepository.save(item);
      }
    }
  }
}
