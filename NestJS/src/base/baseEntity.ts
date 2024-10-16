import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", comment: "id" })
  id: number;

  @Column({ type: "varchar", length: 200, comment: "名称", default: null, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 40, comment: "类型", default: null, nullable: true })
  type: string;

  @Column({ type: "longtext", comment: "头像", nullable: true })
  avatar: string;

  @Column({ type: "int", comment: "排序[从大到小]", default: null, nullable: true })
  sort: number;

  @Column({ type: "bigint", width: 20, comment: "审核人", default: null, nullable: true })
  auditorBy: number;

  @Column({ type: "varchar", length: 100, comment: "审核信息", default: null, nullable: true })
  auditorMsg: string;

  @Column({ type: "bigint", width: 20, comment: "创建人", default: null, nullable: true })
  createBy: number;

  @CreateDateColumn({ type: "timestamp", comment: "创建时间" })
  createTime: Date;

  @Column({ type: "bigint", width: 20, comment: "修改人", default: null, nullable: true })
  updateBy: number;

  @UpdateDateColumn({ type: "timestamp", comment: "更改时间" })
  updateTime: Date;

  @Column({ type: "bigint", width: 20, comment: "删除人", default: null, nullable: true })
  deleteBy: number;

  @DeleteDateColumn({ type: "timestamp", default: null, comment: "伪删除时间" })
  deleteTime: Date;

  @Column({ type: "tinyint", default: 1, width: 1, nullable: true, comment: "状态[1:正常,0:停用]" })
  status: boolean | number;

  @Column({ type: "varchar", length: 100, nullable: true, default: null, comment: "状态停用通知" })
  statusMsg: string;

  @Column({ type: "varchar", length: 100, nullable: true, default: null, comment: "备注" })
  remark: string;

  pageNum: number;

  pageSize: number;

  startTime: Date;

  endTime: Date;
}