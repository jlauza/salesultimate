import { Controller, Get, Render } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  @Render('login')
  login() {
    return { message: this.loginService.getLogin() };
  }
}
