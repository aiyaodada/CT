import { Inject, Injectable, Scope } from "@nestjs/common";
import { ResponseResult } from "src/utils/response.result";
import { extname, join } from "path";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { AllExceptions } from "../handler/all.exceptions";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class UploadFileService {

  constructor(
    @Inject(REQUEST) private readonly request: Request
  ) {
  }

  async uploadFile(file: Express.Multer.File) {
    const uploadDir = path.resolve(__dirname, '..', 'uploadDefault'); // 获取 upload 目录的绝对路径

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // 如果目录不存在，则创建目录
    }
    // 图片存储时获取当前时间设置为文件名
    const filename = Date.now() + extname(file.originalname);
    // 将文件保存到 upload 目录中
    fs.writeFileSync(path.join(uploadDir, filename), file.buffer);
    try {
      return new ResponseResult(200, "上传成功", "/uploadDefault/" + filename);
    } catch (error) {
      throw new AllExceptions("上传失败", 500);
    }
    // return new ResponseResult(200, "上传成功", "/uploadDefault/" + file.filename);
  }
}
