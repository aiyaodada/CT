import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Headers,
  Req,
  Res,
  UseInterceptors, UploadedFile,
  HttpCode
} from "@nestjs/common";
import { UserService } from 'src/service/user.service';
import { RegisterDto, LoginDto } from 'src/dto/create-user.dto';
import { UpdateUserDto, SaveTokenDto, ChangePassword, ChangePhone, ForgotDto } from 'src/dto/update-user.dto';
import { AuthGuard, NoAuth } from "src/guard/auth.guard";
import { Roles } from "src/guard/roles.guard";
import { ExcelService } from "src/service/excel.service";
import { Response } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "../entity/user.entity";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("用户")
@Controller('/api/user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly excelService: ExcelService,
  ) { }

  // 注册
  @Post("register")
  @NoAuth()
  @HttpCode(200)
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @ApiOperation({ summary: "登录", description: "登录接口" })
  @NoAuth()
  @Post("login")
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @ApiOperation({ summary: "创建用户", description: "创建用户接口" })
  @Post()
  @UseGuards(AuthGuard)
  @Roles('system:user:create')
  @HttpCode(200)
  create() {
    return this.userService.create();
  }

  @ApiOperation({ summary: "获取用户列表", description: "获取用户列表接口" })
  @ApiQuery({ name: "page", description: "页码", required: true })
  @ApiQuery({ name: "limit", description: "每页数量", required: true })
  @Get()
  @NoAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('keyword') keyword: string,

    @Req() request: Request
  ) {
    return this.userService.findAll(page, limit, request, keyword);
  }

  // 修改密码
  @Patch('password')
  @UseGuards(AuthGuard)
  @Roles('system:user:update')
  @HttpCode(200)
  updatePassword(@Body() changePassword: ChangePassword, @Req() request: Request) {
    return this.userService.updatePassword(changePassword, request);
  }

  @ApiParam({ name: "id", description: "用户id", required: true })
  @Get(':id')
  @NoAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  findOne(@Param('id') id: string, @Req() request: Request) {

    return this.userService.findOne(+id, request);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles('system:user:update')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.userService.update(+id, updateUserDto, request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('system:user:remove')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 导出用户数据
  @Get('export')
  @NoAuth()
  @HttpCode(200)
  async export(@Res() res: Response) {
    let data = [
      {
        name: 'name',
        field: 'name',
      }
    ]
    await this.excelService.exportExcel(res, [], data);
  }

  @NoAuth()
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  async import(@UploadedFile() file: Express.Multer.File) {
    const data = await this.excelService.importExcel(file.buffer);
    // 解析数据并映射到实体类
    const headers = data[0].slice(1);
    // 创建list
    let list: User[] = [];
    const records: void[] = data.slice(1).map((row: any[]) => {
      const record = new User();
      row.slice(1).forEach((cell, index) => {
        const header = headers[index];
        switch (header) {
          case '姓名':
            record.name = cell as string;
            break;
          case '账号':
            record.userName = cell as string;
            break;
          // case '余额':
          //   record.price = parseFloat(cell as string);
          //   break;
          case '创建时间':
            record.createTime = new Date(cell as string);
            break;
          // case '数量':
          //   record.num = parseInt(cell as string);
          //   break;
        }
      });
      list.push(record)
    });
    console.log(records);
    await this.userService.saveBatch(list);
    return data;
  }
}
