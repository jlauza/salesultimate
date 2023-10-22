import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginService } from "./login/login.service";
import { LoginController } from "./login/login.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TemplateService } from "./templateservice";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this makes the config module available globally
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService, TemplateService],
})
export class AppModule {}
