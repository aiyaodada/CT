import { Module } from '@nestjs/common';
import { RoleService } from 'src/service/role.service';
import { RoleController } from 'src/controller/role.controller';
import { Role } from 'src/entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from 'src/entity/role-menu.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role, RoleMenu]),
  ],
  exports: [TypeOrmModule,RoleService]
})
export class RoleModule { }
