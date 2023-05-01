import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private service: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.service.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      // TODO: return a JWT token instead of the user object
      // TODO: store the JWT token in the database
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }
}
