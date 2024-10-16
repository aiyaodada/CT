import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { RoleModule } from "src/module/role.module";
import { MenuModule } from "src/module/menu.module";
import { UserRoleModule } from "src/module/user-role.module";
import { RoleMenuModule } from "src/module/role-menu.module";
import { UserModule } from "src/module/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { ScheduleModule } from '@nestjs/schedule';
import { config } from "./config";
import { ExcelModule } from 'src/module/excel.module';
import { UploadFileModule } from 'src/module/upload-file.module';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from "path";
import { AuthModule } from "./module/auth.module";
import { FileModule } from 'src/module/file.module';
import { FolderModule } from 'src/module/folder.module';
import { SettingModule } from 'src/module/setting.module';
import { UserService } from "./service/user.service";
import { FolderService } from "./service/folder.service";
import { FileService } from "./service/file.service";
import { UpdateModule } from "./module/update.module";
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: config.mysql.host,
      port: config.mysql.port,
      username: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.database,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      // 设置 synchronize: true 不应在生产中使用 - 否则你可能会丢失生产数据。
      synchronize: true,
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10//重试连接数据库的次数
      // autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 600,
    }),
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: ''
        }
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true
        }
      }
    }),
    // 配置打包目录
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),  // 'views' 是你的Vue项目构建输出的目录
      exclude: ['/api*'],  // 可选，排除API路由以避免冲突
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),  // 'views' 是你的Vue项目构建输出的目录
    }),
    UserModule,
    ExcelModule,
    MenuModule,
    RoleModule,
    RoleMenuModule,
    ScheduleModule.forRoot(),
    UserRoleModule,
    UploadFileModule,
    AuthModule,
    FileModule,
    FolderModule,
    SettingModule,
    UpdateModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [TypeOrmModule]
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}