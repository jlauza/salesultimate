import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TemplateService } from "./templateservice";
import { LoginModule } from "./login/login.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this makes the config module available globally
    }),
    AuthModule,
    UsersModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService, TemplateService],
})
export class AppModule {}
