import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  headline(): any {
    return "Welcome to uDance!";
  }

  subHeadline(): any {
    return "This is sub-headline.";
  }
}
