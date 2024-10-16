import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    @Length(2, 15)
    name: string;
    avatar: string;
    introduce: string;
    // 仅允许 男 女 保密
    @IsIn(["男", "女", "保密"], { message: '性别必须是男、女、保密其中之一' })
    gender: string;
}


export class SaveTokenDto {
    id: number;
    token: string
}

export class ChangePassword {
    @IsNotEmpty({ message: '旧密码不能为空' })
    @IsString({ message: '旧密码必须是字符串' })
    oldPassword: string

    @IsNotEmpty({ message: '新密码不能为空' })
    @IsString({ message: '新密码必须是字符串' })
    @Length(6, 18, { message: '密码长度必须在6-18之间' })
    @Matches(/^(?=.*[a-zA-Z])|(?=.*[!@#$%^&*])/, {
        message: '密码必须包含一个字母或特殊字符',
    })
    newPassword: string
}

export class ChangePhone {
    @IsNotEmpty({ message: '手机号不能为空' })
    phone: string

    code: string
}

export class ForgotDto {
    @IsNotEmpty({ message: "请输入邮箱" })
    @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, { message: "请输入正确的邮箱格式" })
    email: string;

    @ValidateIf(o => o.code !== undefined && o.code !== null && o.code !== '')
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])|(?=.*[!@#$%^&*])/, {
        message: '密码必须包含一个字母或特殊字符',
    })
    @Length(6, 18, { message: '密码长度必须为6-18' })
    password: string;

    @IsOptional()
    code: string;
}