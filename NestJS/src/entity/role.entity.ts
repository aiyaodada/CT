import {
    Entity,
    Column,
    ManyToMany, JoinTable
} from "typeorm";
import { BaseEntity } from 'src/base/baseEntity'; // 引入BaseEntity

@Entity({ comment: '角色表' })
export class Role extends BaseEntity {
}
