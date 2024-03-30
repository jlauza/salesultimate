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

  public async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  public async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  public async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
