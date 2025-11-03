import { BadRequestError } from '@/classes';
import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { UserBalanceModel } from '@/models';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export type TPostUpdateBalanceController = {
  userId: string;
  type?: 'deposit' | 'withdraw';
  amount: number;
  description?: string;
};

export const postUpdateBalanceController = asyncWrapperMiddleware<RequestHandler<any, any, TPostUpdateBalanceController, any>>(
  async (req, res, next) => {
    const { userId, type = 'deposit', amount } = req.body;

    const userBalance = await UserBalanceModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!userBalance) {
      UserBalanceModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        availableBalance: 0
      });

      throw new BadRequestError('User balance not found');
    }

    userBalance.availableBalance += (type === 'deposit' ? 1 : -1) * amount;

    await userBalance.save();

    res.status(EStatusCode.OK).json(userBalance);
  }
);
