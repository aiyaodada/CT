import { Inject, Injectable, Scope } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { Observable } from "rxjs";
import axios, { AxiosResponse } from "axios";
import { REQUEST } from "@nestjs/core";
import { ResponseResult } from "src/utils/response.result";
// zip.service.ts
import AdmZip from 'adm-zip';

import { unzip } from 'src/utils/yangUtils'
import * as fs from "fs";
import * as path from "path";

@Injectable({ scope: Scope.REQUEST })
export class UpdateService {

    constructor(
        // private readonly httpService: HttpService,
        // @Inject(REQUEST) private request: any,
    ) { }

    async getVersion() {
        let result = await axios.get(`https://zhaoyangyun.com/getVersion?keyword=ct`)
        if (result.data.geVersion >= 0) {
            return ResponseResult.okResult("已是最新版")
        }

        // // 下载zip
        let zipUrl = result.data.zipUrl
        let res = await axios.get(zipUrl, {
            responseType: 'arraybuffer'
        })
        // 下载到根目录下
        // 不改文件名字 直接下载到根目录
        fs.writeFileSync(res.data.name, res.data.zip)
        // 获取本项目目录
        const pathFolder = path.resolve(__dirname, '..');
        const zipPath = path.resolve(pathFolder, '..', res.data.name)
        console.log(pathFolder);
        console.log(zipPath);

        // const zipFilePath = path.join(process.cwd(), 'export_project.zip');
        // const outputPath = process.cwd(); // 或者指向一个特定的解压目录
        // console.log(zipFilePath);
        // 解压
        if (!unzip(zipPath, pathFolder)) {
            return ResponseResult.errorResult("更新失败,暂时不知道什么问题,请联系作者");
        }
        return ResponseResult.okResult("更新成功");
    }
}

function InjectModel(arg0: string): (target: typeof UpdateService, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error("Function not implemented.");
}
