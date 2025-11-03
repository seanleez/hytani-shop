import mongoose from 'mongoose';

export enum EUserType {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  BUYER = 'BUYER'
}

export interface IUserProfile {
  userId: mongoose.Types.ObjectId;
  username: string;
  type: EUserType;
  email: string;

  // TODO
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

const UserProfileSchema = new mongoose.Schema<IUserProfile>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Must provide username'],
    trim: true,
    unique: true,
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
  type: {
    type: String,
    required: [true, 'Must provide user type'],
    enum: {
      values: Object.values(EUserType),
      message: `{VALUE} is not supported, type must be one of: ${Object.values(EUserType).join(', ')}`
    }
  },
  avatar: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  }
});

export const UserProfileModel = mongoose.model<IUserProfile>('user-profile', UserProfileSchema);
