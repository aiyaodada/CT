import { Module } from "@nestjs/common";
import { AuthService } from "src/service/auth.service";
import { UserModule } from "src/module/user.module";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn }
    }),
    UserModule
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
}