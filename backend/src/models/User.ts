import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  usertype: 'admin' | 'user';
  createdAt: Date;
  title?: string;
  description?: string;
}


const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  usertype: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, maxlength: 100 },
  description: { type: String, maxlength: 500 },
});

export default mongoose.model<IUser>('User', UserSchema);
