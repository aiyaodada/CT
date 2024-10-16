import { Module } from '@nestjs/common';
import { RoleMenuService } from 'src/service/role-menu.service';
import { RoleMenuController } from 'src/controller/role-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from 'src/entity/role-menu.entity';

@Module({
  controllers: [RoleMenuController],
  providers: [RoleMenuService],
  imports: [
    TypeOrmModule.forFeature([RoleMenu]),
  ],
  exports: [TypeOrmModule]
})
export class RoleMenuModule {}
