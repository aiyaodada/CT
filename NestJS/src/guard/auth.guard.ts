import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "src/config";
import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AllExceptions } from "src/handler/all.exceptions";


export const NO_AUTH_KEY = "noAuth";
export const NoAuth = () => SetMetadata(NO_AUTH_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 如果设置了 NoAuth，则允许访问，无论 token 是否存在或有效
    if (noAuth) {
      if (token) {
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: config.jwt.secret,
          });
          request["user"] = payload;
        } catch {
          // 如果 token 无效，不抛出异常，仅忽略 token
          request["user"] = null;
        }
      }
      return true;
    }

    // 如果没有 token 则直接抛出异常
    if (!token) {
      throw new AllExceptions("token不存在!请登录!", 401);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.secret,
      });
      request["user"] = payload;
    } catch {
      throw new AllExceptions("token无效!请重新登录!", 401);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
