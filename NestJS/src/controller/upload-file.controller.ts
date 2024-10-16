import { Controller, Get, HttpCode, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadFileService } from "src/service/upload-file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { NoAuth } from "../guard/auth.guard";

@Controller("/api/upload-file")
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {
  }

  @Post("/")
  @NoAuth()
  @UseInterceptors(FileInterceptor("file"))
  @HttpCode(200)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadFileService.uploadFile(file);
  }
}
