import {
  Entity,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { BaseEntity } from 'src/base/baseEntity'; // 引入BaseEntity

@Entity({ comment: '用户表' })
export class User extends BaseEntity {

  @Column({ type: "varchar", length: 40, comment: "账号", default: null, nullable: true })
  userName: string;

  @Column({ type: "varchar", length: 100, comment: "密码", default: null, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 40, comment: "性别", default: "保密", nullable: true })
  sex: string;

  @Column({ type: "varchar", length: 40, comment: "邮箱", default: null, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 18, comment: "手机号", default: null, nullable: true })
  phone: string;

  @Column({ type: "int", comment: "错误次数", default: 0, nullable: true })
  errorNum: number;

  @Column({ type: "varchar", length: 200, comment: "token", default: null, nullable: true })
  token: string;
}
