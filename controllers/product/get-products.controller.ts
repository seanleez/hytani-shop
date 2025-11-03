import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { ProductModel, ProductSchema, TProduct } from '@models';
import { ESortDirection, TGetItemsCommonQuery, TGetItemsResBody } from '@types';
import { RequestHandler } from 'express';

export type TProductRequestQuery<T extends Record<string, any> = Record<string, any>> = Partial<Record<keyof TProduct, string>> &
  TGetItemsCommonQuery<T> & {
    priceGte?: string;
    priceLte?: string;
  };

export const getProductsController = asyncWrapperMiddleware<
  RequestHandler<any, TGetItemsResBody<TProduct>, any, TProductRequestQuery<TProduct>>
>(async (req, res, next) => {
  const {
    name,
    category,
    price,
    priceGte,
    priceLte,
    tags,
    sort,
    selectedFields,
    page = String(DEFAULT_PAGE),
    size = String(DEFAULT_PAGE_SIZE)
  } = req.query;

  // queries
  const queryObject = {
    ...(name && { name: { $regex: name, $options: 'i' } }),
    ...(category && { category }),
    ...(price && { price }),
    ...(priceGte && { price: { $gte: Number(priceGte) } }),
    ...(priceLte && { price: { $lte: Number(priceLte) } })
  };

  const queryFn = ProductModel.find(queryObject);

  // sorting
  const [sortField, sortDir] = sort?.split(',') ?? ['createdAt', ESortDirection.DESC];
  if (Object.keys(ProductSchema.obj).includes(sortField) && Object.values(ESortDirection).includes(sortDir as ESortDirection)) {
    queryFn.sort({ [sortField]: sortDir === ESortDirection.ASC ? 1 : -1 });
  } else {
    queryFn.sort({ createdAt: -1 });
  }

  // select fields
  if (selectedFields) {
    const fieldsList = selectedFields.split(',');
    queryFn.select(fieldsList);
  }

  // pagination
  const skipRecords = (Number(page) - 1) * Number(size);
  const limitRecords = Number(size);
  queryFn.skip(skipRecords).limit(limitRecords);

  const products = await queryFn;
  res.status(EStatusCode.OK).json({ data: products, total: products.length });
});
