import mongoose from 'mongoose';
import { ProductSchema, TProduct } from './product.model';

export interface ICartItem extends TProduct {
  quantity: number;
}

export interface ICart {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
}

export const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true
    },
    items: [
      {
        ...ProductSchema.obj,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export const CartModel = mongoose.model<ICart>('cart', CartSchema);
