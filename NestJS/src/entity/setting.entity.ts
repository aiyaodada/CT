import { BaseEntity } from "src/base/baseEntity";
import { Column, Entity } from "typeorm";

@Entity({ comment: '设置表' })
export class Setting extends BaseEntity {

}