import { NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { UserProfileModel } from '@models';
import mongoose from 'mongoose';

export const getProfileController = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const userProfile = await UserProfileModel.findOne({
    userId: new mongoose.Types.ObjectId(userId)
  });

  if (!userProfile) {
    throw new NotFoundError('User profile not found');
  }

  res.status(EStatusCode.OK).json(userProfile);
});
