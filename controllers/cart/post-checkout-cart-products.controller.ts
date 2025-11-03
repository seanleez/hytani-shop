import { BadRequestError, NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { CartModel, UserBalanceModel } from '@models';
import mongoose from 'mongoose';

export const postCheckoutCartProductsController = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const cart = await CartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  if (!cart.items.length) {
    throw new BadRequestError('Cart is empty');
  }

  // create order, transaction

  // charged buyer
  const totalCheckoutAmt = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const userBalance = await UserBalanceModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!userBalance) {
    await UserBalanceModel.create({
      userId,
      availableBalance: 0
    });

    throw new BadRequestError('Insufficient balance');
  }

  if (userBalance.availableBalance < totalCheckoutAmt) {
    throw new BadRequestError('Insufficient balance');
  }

  userBalance.availableBalance -= totalCheckoutAmt;

  await userBalance.save();

  // credit sellers

  // clear cart items
  cart.items = [];
  await cart.save();

  res.status(EStatusCode.OK).json({ balance: userBalance.toObject(), message: 'Checkout successfully!' });
});
