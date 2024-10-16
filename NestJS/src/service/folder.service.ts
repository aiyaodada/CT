import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from 'src/dto/create-folder.dto';
import { UpdateFolderDto } from 'src/dto/update-folder.dto';
import { Folder } from 'src/entity/folder.entity';
import { ResponseResult } from 'src/utils/response.result';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { isEmpty } from 'src/utils/yangUtils';

@Injectable({ scope: Scope.REQUEST })
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
    @Inject(REQUEST) private readonly request: Request
  ) {
  }

  async create(createFolderDto: CreateFolderDto) {
    const englishOrNumberPattern = /^[a-zA-Z0-9]+$/;
    if (!englishOrNumberPattern.test(createFolderDto.name)) {
      return ResponseResult.errorResult("文件夹名称只能是字母或数字！");
    }
    createFolderDto.userId = this.request["user"].sub
    let isFolder = await this.folderRepository.findOne({ where: { name: createFolderDto.name } })
    if (isFolder != null) {
      return ResponseResult.errorResult("该文件夹已存在！");
    }
    
    await this.folderRepository.save(createFolderDto)
    return ResponseResult.okResult()
  }

  async findAll(folder: Folder) {
    // 根据userId查询文件夹
    let queryBuilder = await this.folderRepository.createQueryBuilder("folder")
      .select([
        "folder.id as id",
        "folder.name as name",
        "folder.visible as visible",
        "folder.createTime as createTime",
      ])
      .where("folder.userId = :userId", { userId: this.request["user"].sub })
      .offset((folder.pageNum - 1) * folder.pageSize)
      .limit(folder.pageSize)
      .orderBy("folder.createTime", "DESC");

    if (!isEmpty(folder.name)) {
      queryBuilder = queryBuilder.andWhere("folder.name like :name", { name: "%" + folder.name + "%" });
    }
    if (!isEmpty(folder.visible)) {
      queryBuilder = queryBuilder.andWhere("folder.visible = :visible", { visible: folder.visible });
    }
    // 执行查询
    let result = await queryBuilder.getRawMany();
    let total = await queryBuilder.getCount();

    let data = {
      // 当前数据
      records: result,
      // 总数
      total: total,
      // 每页数
      size: folder.pageSize,
      // 当前页码
      current: folder.pageNum,
      // 总页数
      pages: Math.ceil(total / folder.pageSize),
    };

    return ResponseResult.success(data);
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    if (!this.findByIdAndUserId(id)) {
      return ResponseResult.errorResult("你没有该数据权限！");
    }
    await this.folderRepository.update({ id: id }, updateFolderDto);
    return ResponseResult.okResult();
  }

  async remove(id: number) {
    if (!this.findByIdAndUserId(id)) {
      return ResponseResult.errorResult("你没有该数据权限！");
    }
    await this.folderRepository.delete({ id: id });
    return ResponseResult.okResult();
  }


  // 根据Id和userId查询 是否本数据是否是这个人的
  async findByIdAndUserId(id: number) {
    let result = await this.folderRepository.findOne({ where: { id: id, userId: this.request["user"].sub } });
    if (result) {
      return true;
    }
    return false;
  }
}
