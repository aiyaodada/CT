import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { CreateMenuDto } from 'src/dto/create-menu.dto';
import { UpdateMenuDto } from 'src/dto/update-menu.dto';
import { UserRole } from "../entity/user-role.entity";
import { Role } from "../entity/role.entity";
import { RoleMenu } from "../entity/role-menu.entity";
import { Menu } from "../entity/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class MenuService implements OnModuleInit {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
    
    @Inject(REQUEST) private readonly request: Request
  ) {

  }


  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
  async onModuleInit() {
    const data = [
      // 用户
      { id: 1, name: '用户管理', type: 'user', perms: 'system:user' },
      { id: 2, name: '用户列表', type: 'user', perms: 'system:user:findAll', parentId: 1 },
      { id: 3, name: '用户详情', type: 'user', perms: 'system:user:findOne', parentId: 1 },
      { id: 4, name: '用户添加', type: 'user', perms: 'system:user:create', parentId: 1 },
      { id: 5, name: '用户修改', type: 'user', perms: 'system:user:update', parentId: 1 },
      { id: 6, name: '用户删除', type: 'user', perms: 'system:user:remove', parentId: 1 },

      // 角色
      { id: 7, name: '角色管理', type: 'role', perms: 'system:role' },
      { id: 8, name: '角色列表', type: 'role', perms: 'system:role:findAll', parentId: 7 },
      { id: 9, name: '角色详情', type: 'role', perms: 'system:role:findOne', parentId: 7 },
      { id: 10, name: '角色添加', type: 'role', perms: 'system:role:create', parentId: 7 },
      { id: 11, name: '角色修改', type: 'role', perms: 'system:role:update', parentId: 7 },
      { id: 12, name: '角色删除', type: 'role', perms: 'system:role:remove', parentId: 7 },

      // 帖子
      { id: 13, name: '帖子管理', type: 'article', perms: 'system:article' },
      { id: 14, name: '帖子列表', type: 'article', perms: 'system:article:findAll', parentId: 13 },
      { id: 15, name: '帖子详情', type: 'article', perms: 'system:article:findOne', parentId: 13 },
      { id: 16, name: '帖子添加', type: 'article', perms: 'system:article:create', parentId: 13 },
      { id: 17, name: '帖子修改', type: 'article', perms: 'system:article:update', parentId: 13 },
      { id: 18, name: '帖子删除', type: 'article', perms: 'system:article:remove', parentId: 13 },

      // 评论管理
      { id: 19, name: '评论管理', type: 'comment', perms: 'system:comment' },
      { id: 20, name: '评论列表', type: 'comment', perms: 'system:comment:findAll', parentId: 19 },
      { id: 21, name: '评论详情', type: 'comment', perms: 'system:comment:findOne', parentId: 19 },
      { id: 22, name: '评论添加', type: 'comment', perms: 'system:comment:create', parentId: 19 },
      { id: 23, name: '评论修改', type: 'comment', perms: 'system:comment:update', parentId: 19 },
      { id: 24, name: '评论删除', type: 'comment', perms: 'system:comment:remove', parentId: 19 },

      // 角色权限
      { id: 25, name: '权限修改', type: 'permission', perms: 'system:permission:update' },

      // 用户认证
      { id: 26, name: '用户认证', type: 'verify', perms: 'system:verify' },
      { id: 27, name: '用户认证列表', type: 'verify', perms: 'system:verify:findAll', parentId: 26 },
      { id: 28, name: '用户认证详情', type: 'verify', perms: 'system:verify:findOne', parentId: 26 },
      { id: 29, name: '用户认证添加', type: 'verify', perms: 'system:verify:create', parentId: 26 },
      { id: 30, name: '用户认证修改', type: 'verify', perms: 'system:verify:update', parentId: 26 },
      { id: 31, name: '用户认证删除', type: 'verify', perms: 'system:verify:remove', parentId: 26 },

      // 系统设置
      { id: 32, name: '系统设置', type: 'config', perms: 'system:config' },
      { id: 33, name: '系统设置列表', type: 'config', perms: 'system:config:findAll', parentId: 32 },
      { id: 34, name: '系统设置修改', type: 'config', perms: 'system:config:update', parentId: 32 },

      // 活动
      { id: 35, name: '活动管理', type: 'activity', perms: 'system:activity' },
      { id: 36, name: '活动列表', type: 'activity', perms: 'system:activity:findAll', parentId: 34 },
      { id: 37, name: '活动详情', type: 'activity', perms: 'system:activity:findOne', parentId: 34 },
      { id: 38, name: '活动添加', type: 'activity', perms: 'system:activity:create', parentId: 34 },
      { id: 39, name: '活动修改', type: 'activity', perms: 'system:activity:update', parentId: 34 },
      { id: 40, name: '活动删除', type: 'activity', perms: 'system:activity:remove', parentId: 34 },

      // 轮播管理
      { id: 41, name: '轮播管理', type: 'banner', perms: 'system:banner' },
      { id: 42, name: '轮播列表', type: 'banner', perms: 'system:banner:findAll', parentId: 41 },
      { id: 43, name: '轮播详情', type: 'banner', perms: 'system:banner:findOne', parentId: 41 },
      { id: 44, name: '轮播添加', type: 'banner', perms: 'system:banner:create', parentId: 41 },
      { id: 45, name: '轮播修改', type: 'banner', perms: 'system:banner:update', parentId: 41 },
      { id: 46, name: '轮播删除', type: 'banner', perms: 'system:banner:remove', parentId: 41 },

      // 圈子
      { id: 47, name: '圈子管理', type: 'circle', perms: 'system:circle' },
      { id: 48, name: '圈子列表', type: 'circle', perms: 'system:circle:findAll', parentId: 47 },
      { id: 49, name: '圈子详情', type: 'circle', perms: 'system:circle:findOne', parentId: 47 },
      { id: 50, name: '圈子添加', type: 'circle', perms: 'system:circle:create', parentId: 47 },
      { id: 51, name: '圈子修改', type: 'circle', perms: 'system:circle:update', parentId: 47 },
      { id: 52, name: '圈子删除', type: 'circle', perms: 'system:circle:remove', parentId: 47 },

      // 图片
      { id: 53, name: '图片管理', type: 'media', perms: 'system:media' },
      { id: 54, name: '图片列表', type: 'media', perms: 'system:media:findAll', parentId: 53 },
      { id: 55, name: '图片详情', type: 'media', perms: 'system:media:findOne', parentId: 53 },
      { id: 56, name: '图片添加', type: 'media', perms: 'system:media:create', parentId: 53 },
      { id: 57, name: '图片修改', type: 'media', perms: 'system:media:update', parentId: 53 },
      { id: 58, name: '图片删除', type: 'media', perms: 'system:media:remove', parentId: 53 },

      // 标签
      { id: 59, name: '标签管理', type: 'tag', perms: 'system:tag' },
      { id: 60, name: '标签列表', type: 'tag', perms: 'system:tag:findAll', parentId: 59 },
      { id: 61, name: '标签详情', type: 'tag', perms: 'system:tag:findOne', parentId: 59 },
      { id: 62, name: '标签添加', type: 'tag', perms: 'system:tag:create', parentId: 59 },
      { id: 63, name: '标签修改', type: 'tag', perms: 'system:tag:update', parentId: 59 },
      { id: 64, name: '标签删除', type: 'tag', perms: 'system:tag:remove', parentId: 59 },

      // 头像框
      { id: 65, name: '头像框管理', type: 'avatarBox', perms: 'system:avatarBox' },
      { id: 66, name: '头像框列表', type: 'avatarBox', perms: 'system:avatarBox:findAll', parentId: 65 },
      { id: 67, name: '头像框详情', type: 'avatarBox', perms: 'system:avatarBox:findOne', parentId: 65 },
      { id: 68, name: '头像框添加', type: 'avatarBox', perms: 'system:avatarBox:create', parentId: 65 },
      { id: 69, name: '头像框修改', type: 'avatarBox', perms: 'system:avatarBox:update', parentId: 65 },
      { id: 70, name: '头像框删除', type: 'avatarBox', perms: 'system:avatarBox:remove', parentId: 65 },

      // 合集
      { id: 71, name: '合集管理', type: 'collection', perms: 'system:collection' },
      { id: 72, name: '合集列表', type: 'collection', perms: 'system:collection:findAll', parentId: 71 },
      { id: 73, name: '合集详情', type: 'collection', perms: 'system:collection:findOne', parentId: 71 },
      { id: 74, name: '合集添加', type: 'collection', perms: 'system:collection:create', parentId: 71 },
      { id: 75, name: '合集修改', type: 'collection', perms: 'system:collection:update', parentId: 71 },
      { id: 76, name: '合集删除', type: 'collection', perms: 'system:collection:remove', parentId: 71 },

    ];

    // 写入数据
    for (const perm of data) {
      // 查询是否存在
      const entity = await this.menuRepository.findOne({ where: { name: perm.name, id: perm.id } });
      if (!entity) {
        const item = await this.menuRepository.create(perm);
        await this.menuRepository.save(item);
      }
    };

    // 写入角色权限
    const rolesPermissions = [
      { roleId: 1, menuIds: Array.from({ length: 76 }, (_, i) => i + 1), }, // 超级管理员
      { roleId: 2, menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76] }, // 管理员
      { roleId: 3, menuIds: [2, 3, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 36, 37, 42, 43, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 71, 72, 73, 74, 75, 76] }, // 编辑
      { roleId: 4, menuIds: [2, 3, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 36, 37, 42, 43, 48, 49, 54, 56, 62, 66, 67, 74, 75, 76] }, // 创作者
      { roleId: 5, menuIds: [2, 3, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 36, 37, 42, 43, 48, 49, 54, 56, 62, 66, 67, 74, 75, 76] }, // 普通用户
    ];

    for (const rolePermission of rolesPermissions) {
      for (const menuId of rolePermission.menuIds) {
        const entity = await this.roleMenuRepository.findOne({ where: { roleId: rolePermission.roleId, menuId: menuId } });
        if (!entity) {
          const item = await this.roleMenuRepository.create({ roleId: rolePermission.roleId, menuId: menuId });
          await this.roleMenuRepository.save(item);
        }
      }

    };
  }
}
