import {
  Controller,
  Body,
  Post,
  Request,
  UseGuards,
  Get,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "src/auth/local.auth.guard";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  async addUser(
    @Body("password") userPassword: string,
    @Body("username") userName: string
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassword);

    return {
      msg: "User created successfully",
      userId: result.id,
      userName: result.username,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() req): any {
    return { User: req.user, msg: "User logged in successfully" };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("/protected")
  getHello(@Request() req): string {
    return req.user;
  }

  @Get("/logout")
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: "User logged out." };
  }
}
