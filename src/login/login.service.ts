import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
    headline(): any {
        return "Login now!";
      }  
}
