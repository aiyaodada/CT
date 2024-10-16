import { Controller, Get } from "@nestjs/common";
import { NoAuth } from "src/guard/auth.guard";
import { UpdateService } from "src/service/update.service";

@Controller('/api/update')
export class UpdateController {
    constructor(
        private readonly updateService: UpdateService
    ) {}

    // 查询版本
    @Get("/getVersion")
    @NoAuth()
    async getVersion() {
        await this.updateService.getVersion();
    }
}