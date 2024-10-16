import { Inject, Injectable, OnModuleInit, Scope, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterDto } from "src/dto/create-user.dto";
import { UpdateUserDto, SaveTokenDto, ChangePassword, ChangePhone, ForgotDto } from "src/dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Not, Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { ResponseResult } from "src/utils/response.result"; // 确保路径正确
import { JwtService } from "@nestjs/jwt";
import { hashPassword, validatePassword } from "../utils/bcryptUtils";
import { UserRole } from "src/entity/user-role.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';
import { REQUEST } from "@nestjs/core";
import { config } from "src/config";


@Injectable({ scope: Scope.REQUEST })
export class UserService implements OnModuleInit {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @Inject(REQUEST) private readonly request: Request,
    // 注入缓存
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
  }
  async onModuleInit() {
    const result = await this.userRepository.findBy({ id: 1 });
    if (!result) {
      return;
    }
    
    let registerDto = new RegisterDto();
    registerDto.email = config.setting.email;
    registerDto.password = config.setting.password;
    await this.register(registerDto)
    console.log("初始化完成");
    
  }
  /**
   * 
   * @param page 
   * @param limit 
   * @param request 
   * @param keyword 
   * @returns 
   */
  async findAll(page: number, limit: number, request: Request, keyword: string): Promise<any> {
  }

  /**
   * 
   * @param loginDto 
   * @returns 
   */
  async login(loginDto: LoginDto) {
    // 校验是用户名还是邮箱
    const isEmail = /^\S+@\S+\.\S+$/.test(loginDto.email);

    if (!isEmail) {
      return ResponseResult.errorResult("请输入正确的邮箱");
    }
    const result = await this.userRepository.findOneBy({ email: loginDto.email });

    if (result.errorNum >= 5) {
      return ResponseResult.errorResult("账号已锁定，请联系管理员");
    }

    if (!result) {
      return ResponseResult.errorResult("账号不存在！请注册");
    }

    // 验证密码
    if (!await validatePassword(loginDto.password, result.password)) {
      let user = new User();
      user.id = result.id;
      user.errorNum = result.errorNum + 1;
      await this.userRepository.update({ id: user.id }, user)
      return ResponseResult.errorResult("密码错误");
    }

    const payload = { sub: result.id, email: result.email };
    const token = await this.jwtService.signAsync(payload);

    return ResponseResult.okResult("登录成功", token);
  }

  // 注册
  /**
   * 
   * @param registerDto 
   * @returns 
   */
  async register(registerDto: RegisterDto) {
    // 先查询是否账号存在
    const result = await this.userRepository.findOneBy({ email: registerDto.email });

    if (result) {
      return ResponseResult.errorResult("用户名已存在！请重新输入");
    }

    // 验证成功后进入注册
    // 密码加密
    registerDto.password = await hashPassword(registerDto.password);

    // 存入数据库
    const newUser = this.userRepository.create(registerDto);
    const save = await this.userRepository.save(newUser);

    return ResponseResult.okResult("注册成功", save);
  }

  /**
   * 
   * @param CreateUserDto 
   * @returns 
   */
  async create() {
  }

  /**
   * 
   * @param id 
   * @param request 
   * @returns 
   */
  async findOne(id: number, request: Request): Promise<any> {
  }
  /**
   * 
   * @param id 
   * @param updateUserDto 
   * @param request 
   * @returns 
   */
  async update(id: number, updateUserDto: UpdateUserDto, request: Request) {
  }

  /**
   * 
   * @param changePassword 
   * @param request 
   * @returns 
   */
  async updatePassword(changePassword: ChangePassword, request: Request) {
    const userId = request["user"]?.sub || null;
    const user = await this.userRepository.findOneBy({ id: userId });
    // 检查旧密码是否正确
    if (!await validatePassword(changePassword.oldPassword, user.password)) {
      return ResponseResult.errorResult("密码错误！");
    }

    // 加密新密码
    const hashedPassword = await hashPassword(changePassword.newPassword);
    await this.userRepository.update(userId, { password: hashedPassword });
    return ResponseResult.okResult("修改成功");
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number): Promise<any> {
    await this.userRepository.delete(id);
    return ResponseResult.okResult("删除成功");
  }

  //   批量插入
  /**
   * 
   * @param list 
   * @returns 
   */
  async saveBatch(list: User[]) {
    await this.userRepository.save(list);
    return ResponseResult.okResult("批量插入成功");
  }

}



