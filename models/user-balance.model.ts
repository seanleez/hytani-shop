import mongoose from 'mongoose';

export interface IUserBalance {
  userId: mongoose.Types.ObjectId;
  availableBalance: number;
}

export const UserBalanceSchema = new mongoose.Schema<IUserBalance>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  availableBalance: {
    type: Number,
    required: true,
    default: 0
  }
});

export const UserBalanceModel = mongoose.model<IUserBalance>('user-balance', UserBalanceSchema);
