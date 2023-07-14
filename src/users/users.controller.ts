import { Controller, Body, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";

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
}
