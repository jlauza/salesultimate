import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext) {
    console.log(context);
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    console.log(result);
    console.log(request.user);
    return result;
  }
}
