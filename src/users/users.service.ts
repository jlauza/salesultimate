import { Injectable } from "@nestjs/common";
// Replace any with the actual user entity
import { user, UserDocument } from "../schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(user.name) private userModel: Model<UserDocument>) {}

  public async create(user: UserDocument): Promise<UserDocument> {
    return this.userModel.create(user);
  }
}
