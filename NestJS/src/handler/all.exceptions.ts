import { Catch, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptions extends HttpException {
  // 修改返回状态码的key为code
  constructor(message: string = '未知错误!请联系管理员', status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
  getResponse() {
    return {
      code: this.getStatus(),
      msg: this.message,
    };
  }

}
