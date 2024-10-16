import { Injectable, CanActivate, ExecutionContext, SetMetadata, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoleService } from "src/service/user-role.service";
import { AllExceptions } from "src/handler/all.exceptions";

export const ROLES_KEY = "roles";
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRoleService: UserRoleService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    return true;
    // const requiredRoles = this.reflector.getAllAndOverride<[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass()
    // ]);
    // if (!requiredRoles) {
    //   return true;
    // }
    // const { user } = context.switchToHttp().getRequest();
    // // 根据用户Id拿权限
    // let data: any = await this.userRoleService.getRoleAndPermissionByUserId(user?.sub);
    
    // if (!data.includes(...requiredRoles)) {
    //   throw new AllExceptions("您暂无该权限！", 403)
    // }
    // //requiredRoles.some((role) => user.roles?.includes(role))
    // return true;
  }
}
