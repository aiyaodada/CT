import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { RoleMenuModule } from 'src/module/role-menu.module';
import { RoleModule } from 'src/module/role.module';
import { Role } from 'src/entity/role.entity';
import { RoleMenu } from 'src/entity/role-menu.entity';
import { UserRoleModule } from './user-role.module';
import { ExcelModule } from "./excel.module";
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Role, RoleMenu]),
    RoleMenuModule,
    RoleModule,
    UserRoleModule,
    ExcelModule,
    // TypeOrmModule.forRoot({
    //   autoLoadEntities: true,
    // })
  ],
  exports: [TypeOrmModule, UserService]

})
export class UserModule {
}
