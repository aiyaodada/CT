import { Inject, Injectable, Scope } from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
import { CreateFileDto } from 'src/dto/create-file.dto';
import { extname, join } from "path";
import { ResponseResult } from 'src/utils/response.result';
import { AllExceptions } from 'src/handler/all.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from 'src/entity/file.entity';
import { randomUUID } from 'crypto';
import { config } from 'src/config'
import { REQUEST } from '@nestjs/core';
import { Folder } from 'src/entity/folder.entity';
import { isEmpty } from 'src/utils/yangUtils';

@Injectable({ scope: Scope.REQUEST })
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
    @Inject(REQUEST) private readonly request: Request
  ) {
  }
  // 上传文件
  async uploadFile(file: Express.Multer.File, createFileDto: CreateFileDto) {
    // 检查文件类型和大小
    const allowedTypes = /^image\//; // 允许所有图片类型
    const maxSize = 300 * 1024 * 1024; // 300MB

    if (!allowedTypes.test(file.mimetype)) {
      return ResponseResult.errorResult('不支持的文件类型');
    }

    if (file.size > maxSize) {
      return ResponseResult.errorResult('文件不得超过300M');
    }

    const uploadDir = path.resolve(__dirname, '..', '..', config.setting.filePath); // 获取 upload 目录的绝对路径

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // 如果目录不存在，则创建目录
    }

    //获取用户传入的文件夹Id
    const isFolder = await this.folderRepository.findOne({ where: { id: createFileDto.folderId, userId: this.request["user"].sub } });
    console.log(this.request["user"].sub);

    if (isFolder == null) {
      return ResponseResult.errorResult("文件夹不存在");
    }
    // 在uploadFolderDir创建个文件夹
    const uploadFolderDir = path.resolve(__dirname, uploadDir, isFolder.name); // 获取 upload 目录的绝对路径

    if (!fs.existsSync(uploadFolderDir)) {
      fs.mkdirSync(uploadFolderDir); // 如果目录不存在，则创建目录
    }

    // 生成UUID
    let uuId = randomUUID();
    // 图片存储时获取当前时间设置为文件名
    // const filename = Date.now() + extname(file.originalname);
    const filename = uuId + extname(file.originalname);
    // 将文件保存到 upload 目录中
    fs.writeFileSync(path.join(uploadFolderDir, filename), file.buffer);
    //  将图片信息存入到数据库
    createFileDto.userId = this.request["user"].sub;
    createFileDto.fileUrl = config.setting.baseUrl;
    createFileDto.filePrefix = uuId;
    createFileDto.fileSuffix = extname(file.originalname);
    this.fileRepository.save({ ...createFileDto })
    try {
      return ResponseResult.success(createFileDto.fileUrl + "/" + config.setting.filePath + "/" + isFolder.name + "/" + filename, "上传成功");
    } catch (error) {
      throw new AllExceptions("上传失败", 500);
    }
  }

  async findAll(file: File) {
    // 查询
    let queryBuilder = this.fileRepository.createQueryBuilder("file")
      .select([
        "file.id as id",
        "file.fileUrl as fileUrl",
        "file.filePrefix as filePrefix",
        "file.fileSuffix as fileSuffix",
        "file.userId as userId",
        "file.folderId as folderId",
        "file.createTime as createTime",
        "folder.name as folderName",
        `CONCAT(fileUrl,'/','${config.setting.filePath}','/', folder.name , '/' , filePrefix, fileSuffix) AS filePath`,
        `folder.visible as folderVisible`
      ])
      .leftJoin(Folder, "folder", "folder.id = file.folderId")
      .where("file.userId = :userId", { userId: this.request["user"].sub })
      .offset((file.pageNum - 1) * file.pageSize)
      .limit(file.pageSize)
      .orderBy("file.createTime", "DESC");
    if (!isEmpty(file.folderId)) {
      queryBuilder = queryBuilder.andWhere("folder.id = :folderId", { folderId: file.folderId });
    }
    if (!isEmpty(file.filePrefix)) {
      queryBuilder = queryBuilder.andWhere("file.filePrefix like :filePrefix", { filePrefix: `%${file.filePrefix}%` });
    }
    if (!isEmpty(file.folderVisible)) {
      queryBuilder = queryBuilder.andWhere("folder.visible = :folderVisible", { folderVisible: file.folderVisible });
    }
    // if (!isEmpty(folder.visible)) {
    //   queryBuilder = queryBuilder.andWhere("folder.visible = :visible", { visible: folder.visible });
    // }
    // 执行查询

    let result = await queryBuilder.printSql().getRawMany();
    let total = await queryBuilder.getCount();

    let data = {
      // 当前数据
      records: result,
      // 总数
      total: total,
      // 每页数
      size: file.pageSize,
      // 当前页码
      current: file.pageNum,
      // 总页数
      pages: Math.ceil(total / file.pageSize),
    };

    return ResponseResult.success(data);
  }

  // 公共文件列表
  async findAllPublic(file: File) {
    let queryBuilder = await this.fileRepository.createQueryBuilder('file')
      .select(["file.id as id",
        "file.fileUrl as fileUrl",
        "file.filePrefix as filePrefix",
        "file.fileSuffix as fileSuffix",
        "file.userId as userId",
        "file.folderId as folderId",
        "file.createTime as createTime",
        "folder.name as folderName",
        `CONCAT(fileUrl,'/','${config.setting.filePath}','/', folder.name , '/' , filePrefix, fileSuffix) AS filePath`,
        `folder.visible as folderVisible`])
      .leftJoin(Folder, "folder", "folder.id = file.folderId")
      .offset((file.pageNum - 1) * file.pageSize)
      .limit(file.pageSize)
      .orderBy("file.createTime", "DESC");
    let result = await queryBuilder.printSql().getRawMany();
    let total = await queryBuilder.getCount();

    let data = {
      // 当前数据
      records: result,
      // 总数
      total: total,
      // 每页数
      size: file.pageSize,
      // 当前页码
      current: file.pageNum,
      // 总页数
      pages: Math.ceil(total / file.pageSize),
    };
    return ResponseResult.success(data);
  }

  async findFileVisible(url: string) {
    // 根据/ 分割 获取倒数第二个/后面内容
    let urlArray = url.split("/").slice(-2);
    console.log(urlArray);
    // let baseUrl = url.split("/")
    let fileUrl = config.setting.baseUrl;
    let folderName = urlArray[0];
    let fileName = urlArray[1];
    let filePrefix = fileName.split(".")[0];
    let fileSuffix = "." + fileName.split(".")[1];
    let result = await this.fileRepository.createQueryBuilder("file")
      .select([
        "file.id as id",
        "file.fileUrl as fileUrl",
        "file.filePrefix as filePrefix",
        "file.fileSuffix as fileSuffix",
        "file.userId as userId",
        "file.folderId as folderId",
        "file.createTime as createTime",
        "folder.name as folderName",
        "folder.visible as visible"
      ])
      .leftJoin(Folder, "folder", "folder.id = file.folderId")
      .where("file.fileUrl = :fileUrl", { fileUrl: fileUrl })
      .andWhere("file.filePrefix = :filePrefix", { filePrefix: filePrefix })
      .andWhere("file.fileSuffix = :fileSuffix", { fileSuffix: fileSuffix })
      .andWhere("folder.name = :folderName", { folderName: folderName })
      .printSql()
      .getRawOne();
    return result;
  }

  async remove(id: number) {
    if (!this.findByIdAndUserId(id)) {
      return ResponseResult.errorResult("你没有该数据权限！");
    }
    await this.fileRepository.delete(id);
    return ResponseResult.okResult("删除成功");
  }

  // 根据Id和userId查询 是否本数据是否是这个人的
  async findByIdAndUserId(id: number) {
    let result = await this.fileRepository.findOne({ where: { id: id, userId: this.request["user"].sub } });
    if (result) {
      return true;
    }
    return false;
  }
}
