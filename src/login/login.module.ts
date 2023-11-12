import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
    imports: [],
    providers: [LoginService],
    exports: [LoginService],
    controllers: [LoginController],    
})
export class LoginModule {}
