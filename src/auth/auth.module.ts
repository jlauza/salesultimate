import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "src/users/users.module";
import { jwtConstants } from "./constants";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { SetMetadata } from "@nestjs/common";

Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController],
  exports: [AuthService],
});

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export class AuthModule {}
