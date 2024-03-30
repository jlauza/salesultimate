import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/users/users.model";
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as needed
});

export const user = mongoose.model<User>("User", userSchema);
export type UserDocument = User & Document;
