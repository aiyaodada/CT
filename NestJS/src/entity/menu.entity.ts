import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/base/baseEntity";

@Entity({ comment: '菜单权限表' })
export class Menu extends BaseEntity {
  @Column({ type: "longtext", comment: "路由地址", nullable: true })
  path: string;
  @Column({ type: "varchar", length: 200, comment: "权限标识", default: null, nullable: true })
  perms: string;
  @Column({ type: "varchar", length: 200, comment: "菜单图标", default: null, nullable: true })
  icon: string;
  @Column({ type: "bigint", width: 20, comment: "父菜单ID", default: null, nullable: true })
  parentId: number;
  @Column({ type: "longtext", comment: "组件路径", nullable: true })
  component: string;
  @Column({ type: "tinyint", comment: "是否为外链[0:否,1:是]", default: 0, nullable: true })
  isFrame: number;
  @Column({ type: "tinyint", comment: "菜单状态[0:显示,1:隐藏]", default: 0, nullable: true })
  visible: number;
  @Column({ type: "varchar", length: 40, comment: "菜单类型[M:目录,C:菜单,F:按钮]", default: null, nullable: true })
  menuType: string;
}
