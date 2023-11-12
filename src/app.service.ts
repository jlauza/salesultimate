import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  headline(): any {
    return "Welcome to NestJS Playground!";
  }

  subHeadline(): any {
    return "Placeholder sub-headline.";
  }
}
