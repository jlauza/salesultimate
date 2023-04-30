import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  getLogin(): string {
    return 'You are on the login page!';
  }
}
