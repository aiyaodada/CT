import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateController } from "src/controller/update.controller";
import { UpdateService } from "src/service/update.service";

@Module({
    controllers: [UpdateController],
    providers: [UpdateService, 
        // HttpService
    ],
    imports: [TypeOrmModule.forFeature([]),
        // HttpModule.registerAsync({
        //     useFactory: () => ({
        //         timeout: 5000,
        //         maxRedirects: 5,
        //     }),
        // })
    ],
    exports: [TypeOrmModule, UpdateService]
})
export class UpdateModule {
}