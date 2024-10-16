import { BaseEntity } from "src/base/baseEntity";
import { Column, Entity } from "typeorm";

@Entity({ comment: '角色菜单权限表' })
export class RoleMenu extends BaseEntity {
  @Column({ type: "bigint", width: 20, comment: "角色Id", default: null, nullable: true })
  roleId: number;

  @Column({ type: "bigint", width: 20, comment: "菜单角色Id", default: null, nullable: true })
  menuId: number;
}

