import { Module } from '@nestjs/common';
import { UploadFileService } from 'src/service/upload-file.service';
import { UploadFileController } from 'src/controller/upload-file.controller';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname,join } from "path";

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
  imports: [
  //   MulterModule.register({
  //   storage:diskStorage({
  //     destination:join(__dirname,"../uploadDefault"),
  //     filename:(_,file,callback) => {
  //       const fileName = `${new Date().getTime() + extname(file.originalname)}`
  //       return callback(null,fileName)
  //     }
  //   })
  // })
  ],
})
export class UploadFileModule {}
