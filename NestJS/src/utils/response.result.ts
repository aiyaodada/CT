import { Injectable } from '@nestjs/common';

// 定义响应状态码枚举类
class AppHttpCodeEnum {
    static SUCCESS = new AppHttpCodeEnum(200, '操作成功');
    static ERROR = new AppHttpCodeEnum(500, '系统内部错误');
    constructor(public code: number, public msg: string) { }
}

// 定义响应数据接口
interface ResponseResultData<T> {
    code?: number;
    msg?: string;
    data?: T;
}

@Injectable()
export class ResponseResult<T> implements ResponseResultData<T> {
    code: number;
    msg: string;
    data: T;


    constructor(
        code?: number, // code变为可选参数
        msg?: string, // msg保持可选
        data?: T // data保持可选
    ) {
        // 为code提供默认值，以处理未提供code的情况
        this.code = code ?? AppHttpCodeEnum.SUCCESS.code;

        // 如果提供了msg，则使用提供的msg，否则使用默认的成功消息
        this.msg = msg ?? (this.code === AppHttpCodeEnum.SUCCESS.code ? AppHttpCodeEnum.SUCCESS.msg : '');

        this.data = data;
    }

    // // 单一的构造函数实现，智能处理不同参数情况
    // constructor(
    //     code: number = AppHttpCodeEnum.SUCCESS.code,
    //     msg: string = AppHttpCodeEnum.SUCCESS.msg,
    //     data?: T
    // ) {
    //     // 根据参数数量和类型智能分配
    //     this.code = arguments.length > 0 ? code : AppHttpCodeEnum.SUCCESS.code;
    //     this.msg = arguments.length > 1 ? msg : AppHttpCodeEnum.SUCCESS.msg;
    //     this.data = data; // 数据始终是可选的，按实际情况赋值
    // }
    // constructor(code?: number, msg?: string, data?: T) {
    //     this.code = code ?? AppHttpCodeEnum.SUCCESS.code;
    //     this.msg = msg ?? AppHttpCodeEnum.SUCCESS.msg;
    //     this.data = data;
    // }

    // 静态方法生成错误响应
    static errorResult<T>(msg?: string, code: number = 500): ResponseResult<T> {
        return new ResponseResult(AppHttpCodeEnum.ERROR.code, msg ?? AppHttpCodeEnum.ERROR.msg);
    }

    // 静态方法生成成功响应，这里通过泛型函数的方式来定义
    static okResult<T>(msg?: string, data?: T, code?: number): ResponseResult<T> {
        return new ResponseResult(code ?? AppHttpCodeEnum.SUCCESS.code, msg ?? AppHttpCodeEnum.SUCCESS.msg, data);
    }
    // 静态方法生成成功响应，这里通过泛型函数的方式来定义
    static success<T>(data?: T, msg?: string, code?: number): ResponseResult<T> {
        return new ResponseResult(code ?? AppHttpCodeEnum.SUCCESS.code, msg ?? AppHttpCodeEnum.SUCCESS.msg, data);
    }
}