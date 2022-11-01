import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// export type UserDocument = User;

export enum UserRole {
  admin = 'admin',
  normal = 'normal',
}
@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.normal })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
