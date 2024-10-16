import { IsNotEmpty } from "class-validator";

export class CreateUserRoleDto {
    @IsNotEmpty({ message: "用户id不能为空" })
    userId: number;

    @IsNotEmpty({ message: "角色id不能为空" })
    roleId: number;
}
