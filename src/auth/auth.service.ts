import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private service: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.service.findOne(username, password);
    if (user && user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
