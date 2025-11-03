import express from 'express';
import {
  postCreateProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  patchUpdateProductController
} from '../controllers';

const productRouter = express.Router();

productRouter.route('/').get(getProductsController);
productRouter.route('/').post(postCreateProductController);
productRouter.route('/:id').get(getProductController);
productRouter.route('/:id').patch(patchUpdateProductController);
productRouter.route('/:id').delete(deleteProductController);

export default productRouter;
