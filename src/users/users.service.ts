import { Injectable } from "@nestjs/common";
// Replace any with the actual user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: "jayson",
      password: "changeme",
      email: "jayson@maildrop.cc",
    },
  ];

  async findOne(username: string, password: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.username === username && user.password === password
    );
  }
}
