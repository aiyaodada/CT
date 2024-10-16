import { forwardRef, Module } from "@nestjs/common";
import { MenuService } from 'src/service/menu.service';
import { MenuController } from 'src/controller/menu.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Menu } from "src/entity/menu.entity";
import { RoleMenuModule } from "./role-menu.module";

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
  imports: [TypeOrmModule.forFeature([Menu]), RoleMenuModule]
})
export class MenuModule { }
