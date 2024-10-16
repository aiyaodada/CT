import { BaseEntity } from "src/base/baseEntity";
import { Column, Entity } from "typeorm";

@Entity({ comment: '文件表' })
export class File extends BaseEntity {
    @Column({ type: "bigint", width: 20, comment: "文件夹Id", default: null, nullable: true })
    folderId: number;

    @Column({ type: "bigint", width: 20, comment: "用户Id", default: null, nullable: true })
    userId: number;

    @Column({ type: "longtext", comment: "文件链接", default: null, nullable: true })
    fileUrl: string;

    @Column({ type: "longtext", comment: "文件前缀", default: null, nullable: true })
    filePrefix: string;

    @Column({ type: "varchar", width: 40, comment: "文件后缀", default: null, nullable: true })
    fileSuffix: string;

    @Column({ type: "varchar", width: 40, comment: "分割", default: '/', nullable: true })
    split: string;

    folderName: string;

    folderVisible: number;
}