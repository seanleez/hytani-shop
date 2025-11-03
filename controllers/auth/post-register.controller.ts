import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { CartModel, EUserType, IUser, UserBalanceModel, UserModel, UserProfileModel } from '@models';
import { RequestHandler } from 'express';

export type TRegisterRequestBody = IUser & { type?: EUserType };

// TODO: Update later, user type ADMIN can add user balance
const DEFAULT_USER_BALANCE = 1000;

export const postRegisterController = asyncWrapperMiddleware<RequestHandler<any, any, TRegisterRequestBody, any>>(
  async (req, res, next) => {
    const user = await UserModel.create(req.body);

    const userProfile = await UserProfileModel.create({
      userId: user._id,
      username: user.username,
      email: req.body.email,
      type: req.body.type ?? EUserType.BUYER
    });

    // bonus user a reward after register
    await UserBalanceModel.create({
      userId: user._id,
      availableBalance: DEFAULT_USER_BALANCE
    });

    // initiate empty cart
    await CartModel.create({
      userId: user._id,
      items: []
    });

    const { _id, ...restUserProfile } = userProfile.toObject();

    const accessToken = user.createJWT();

    res.status(EStatusCode.CREATED).json({ user: { ...user.getUsefulInfo(), ...restUserProfile }, accessToken });
  }
);
