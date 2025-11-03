import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TJWTDecodePayload } from '@/middlewares';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserMethods {
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getUsefulInfo(): { id: string; username: string; email: string };
}

export type TUserModelType = Model<IUser, {}, IUserMethods>;

// schema
export const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Must provide username'],
    unique: true,
    trim: true,
    minlength: [6, 'Username can not be less than 6 characters'],
    maxlength: [100, 'Username can not be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Must provide email'],
    unique: true,
    validate: {
      validator: (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Must provide password'],
    minlength: [6, 'Password can not be less than 6 characters'],
    maxlength: [12, 'Password can not be more than 100 characters']
  }
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password ?? '', salt);
});

UserSchema.methods.createJWT = function () {
  const secret = (process.env.JWT_SECRET || 'jwtSecret') as jwt.Secret;
  const expiresIn = (process.env.JWT_LIFETIME || '1d') as jwt.SignOptions['expiresIn'];
  const payload = { userId: this._id, username: this.username } as TJWTDecodePayload;

  return jwt.sign(payload, secret, { expiresIn });
};

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password ?? '');
};

UserSchema.methods.getUsefulInfo = function () {
  return { id: this._id, username: this.username, email: this.email };
};

export const UserModel = mongoose.model<IUser, TUserModelType>('user', UserSchema);
