import {
  deleteProductsFromCartController,
  getCartController,
  patchUpdateProductQuantityInCartController,
  postAddProductToCartController,
  postCheckoutCartProductsController
} from '@/controllers';
import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/', getCartController);

cartRouter.post('/products', postAddProductToCartController);
cartRouter.patch('/products', patchUpdateProductQuantityInCartController);
cartRouter.delete('/products', deleteProductsFromCartController);

cartRouter.post('/checkout', postCheckoutCartProductsController);

export default cartRouter;
