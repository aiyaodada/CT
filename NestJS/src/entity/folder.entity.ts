import { BaseEntity } from "src/base/baseEntity";
import { Column, Entity, ViewColumn } from "typeorm";

@Entity({ comment: '文件夹表' })
export class Folder extends BaseEntity {
    @Column({ type: "bigint", width: 20, comment: "用户Id", default: null, nullable: true })
    userId: number;

    @Column({ type: "int", width: 20, comment: "可见类型[0:公共,1:私密]", default: 0, nullable: true })
    visible: number;
    
    fileName: string;
}