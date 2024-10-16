import { Inject, Injectable, Scope } from "@nestjs/common";
import { CreateUserRoleDto } from "src/dto/create-user-role.dto";
import { UpdateUserRoleDto } from "src/dto/update-user-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { Role } from "src/entity/role.entity";
import { UserRole } from "../entity/user-role.entity";
import { RoleMenu } from "../entity/role-menu.entity";
import { Menu } from "../entity/menu.entity";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @Inject(REQUEST) private readonly request: Request
  ) {
  }

  // 根据用户Id查询角色和权限
  async getRoleAndPermissionByUserId(userId: number) {
    let result = [];
    if (userId == 1) {
      result = await this.menuRepository.createQueryBuilder("menu")
        .select("menu.perms as menuPerms")
        .getRawMany();
    } else {
      result = await this.userRoleRepository.createQueryBuilder("userRole")
        .distinct(true)
        .leftJoinAndSelect(Role, "role", `role.id = userRole.roleId`)
        .leftJoinAndSelect(RoleMenu, "roleMenu", `roleMenu.roleId = userRole.roleId`)
        .leftJoinAndSelect(Menu, "menu", `menu.id = roleMenu.menuId`)
        .where(`userRole.userId = :userId`, { userId })
        .andWhere(`roleMenu.status = 1`)
        .select(["menu.perms as menuPerms"])
        .getRawMany();
    }
    let menuPerms = result.map((v) => v.menuPerms);
    return menuPerms;
  }

  create(createUserRoleDto: CreateUserRoleDto) {
    return "This action adds a new userRole";
  }

  findAll() {
    return `This action returns all userRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }

}
