import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.model";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Add methods for handling HTTP requests here
  // For example, this method creates a new user
  @Post()
  public async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  public async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  public async remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
