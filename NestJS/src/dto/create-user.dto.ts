import { IsNotEmpty, Length, Matches } from 'class-validator'

export class RegisterDto {
    @IsNotEmpty({ message: "请输入邮箱" })
    @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, { message: "请输入正确的邮箱格式" })
    email: string;

    @Length(6, 18, { message: '密码长度必须为6-18' })
    password: string;
}

export class LoginDto {
    @IsNotEmpty({ message: "请输入邮箱" })
    @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, { message: "请输入正确的邮箱格式" })
    email: string;

    @Length(6, 18, { message: '密码长度必须为6-18' })
    password: string;
}