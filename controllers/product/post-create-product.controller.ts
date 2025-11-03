import { BadRequestError } from '@/classes';
import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { EUserType, ProductModel, UserProfileModel } from '@/models';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export const postCreateProductController: RequestHandler = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const user = await UserProfileModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!user || user.type !== EUserType.SELLER) {
    throw new BadRequestError('User is not a seller');
  }

  const product = await ProductModel.create({ ...req.body, listedBy: userId });
  res.status(EStatusCode.CREATED).json(product);
});
