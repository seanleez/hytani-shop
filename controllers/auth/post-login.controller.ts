import { BadRequestError } from '@/classes';
import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { IUser, UserModel } from '@/models';
import { RequestHandler } from 'express';

export type TLoginRequestBody = Omit<IUser, 'email'>;

export const postLoginController = asyncWrapperMiddleware<RequestHandler<any, any, TLoginRequestBody, any>>(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide username and password');
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError('Incorrect password');
  }

  const accessToken = user.createJWT();

  res.status(EStatusCode.OK).json({ user: user.getUsefulInfo(), accessToken });
});
