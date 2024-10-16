import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { config } from "./config";
import { JwtService } from "@nestjs/jwt";
import { AllExceptions } from "./handler/all.exceptions";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as hbs from 'handlebars';
import * as express from 'express';
import moment from "moment"; import { FileService } from "src/service/file.service"
import { UserService } from "./service/user.service";

// 图片访问拦截器
const fileFilter = (fileService: FileService, jwtService: JwtService) => async (req: any, res: any, next: any) => {

  if (req["url"].split("/")[1] != "uploadDefault") {
    return next();
  }
  // 根据图片查询是否是公开的
  let result = await fileService.findFileVisible(req["url"].split("?")[0]);
  if (result.visible == 0) {
    return next();
  }
  // 不为0的话代表私密 需要根据token来解析userId 然后判断token是否对应userId
  let token = req["query"].token
  try {
    const payload = await jwtService.verifyAsync(token, {
      secret: config.jwt.secret,
    });
    if (payload.sub == result.userId) {
      return next();
    }
  } catch (error) {
    console.error('Error in interceptor:', error);
    return res.send(JSON.stringify({ code: 401, message: "该图片是私密图片" }));
  }
  return res.send(JSON.stringify({ code: 401, message: "该图片是私密图片" }));
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const fileService = await app.resolve(FileService);
  const jwtService = await app.resolve(JwtService);
  app.use(fileFilter(fileService, jwtService));

  const userService = await app.resolve(UserService);
  app.use(onInit(userService));

  app.useStaticAssets(join(__dirname, '..', "static"),
    {
      // 不需要首页index.html
      index: false,
      // 不需要将目录重定向
      redirect: false,
      // 虚拟前缀，访问资源都需要带上/public/
      // prefix: '/public/',
      prefix: "/static"
    }
  );
  app.useStaticAssets(join(__dirname, '..', "uploadDefault"), {
    prefix: "/uploadDefault",
  });

  app.enable('trust proxy')

  // swagger
  const options =
    new DocumentBuilder()
      .setTitle('SugarLess')
      .setDescription('SugarLess')
      .setVersion('1')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)

  // 引擎模板
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));

  // 配置 Handlebars 模板引擎
  // app.engine('hbs', (filePath, options, callback) => {
  //   const template = hbs.compile(require('fs').readFileSync(filePath, 'utf-8'));
  //   const rendered = template(options);
  //   return callback(null, rendered);
  // });

  // app.setViewEngine('hbs');

  await app.listen(3000);
}

const onInit = (userService: UserService) => (req: any, res: any, next: any) => {
  userService.onModuleInit();
  return next();
}

bootstrap();
