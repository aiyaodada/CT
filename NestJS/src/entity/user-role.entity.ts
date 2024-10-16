import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from 'src/base/baseEntity'; // 引入BaseEntity
@Entity({ comment: '用户角色表' })
export class UserRole extends BaseEntity {

    @Column({ type: "bigint", width: 20, comment: "用户Id", default: null, nullable: true })
    userId: number;

    @Column({ type: "bigint", width: 20, comment: "角色Id", default: null, nullable: true })
    roleId: number;
}
