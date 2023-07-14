import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new UnauthorizedException("User not found");
    } else if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    const payload = { sub: user.id, userName: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
