import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type UserDocument = User;

export enum UserRole {
  admin = 'admin',
  normal = 'normal',
}
@Schema()
export class User {
  @Prop({ _id: true })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.normal })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
