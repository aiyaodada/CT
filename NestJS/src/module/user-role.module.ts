import { Module } from '@nestjs/common';
import { UserRoleService } from 'src/service/user-role.service';
import { UserRoleController } from 'src/controller/user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entity/user-role.entity';
import { Menu } from "src/entity/menu.entity";
@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService],
  imports: [
    TypeOrmModule.forFeature([UserRole, Menu]),
  ],
  exports: [UserRoleService, TypeOrmModule],
})
export class UserRoleModule { }