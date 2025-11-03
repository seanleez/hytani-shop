import { NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { UserBalanceModel } from '@models';
import mongoose from 'mongoose';

export const getMyBalanceController = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const userBalance = await UserBalanceModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!userBalance) {
    throw new NotFoundError('User not found');
  }

  res.status(EStatusCode.OK).json(userBalance);
});
