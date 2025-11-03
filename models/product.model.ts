import mongoose from 'mongoose';

export enum EProductCategory {
  ACCESSORY = 'ACCESSORY',
  CLOTHING = 'CLOTHING',
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  TOOLS = 'TOOLS',
  OTHER = 'OTHER'
}

export type TProduct = mongoose.Require_id<{
  name: string;
  description: string;
  category: EProductCategory;
  thumbnail: string;
  price: number;
  listedBy: mongoose.Schema.Types.ObjectId;
  tags?: string[];
  soldItems?: number;
  rating?: number;
}>;

// schema
export const ProductSchema = new mongoose.Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Must provide product name'],
      trim: true,
      minlength: [6, 'Name can not be less than 6 characters'],
      maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Must provide product description'],
      trim: true,
      maxlength: [150, 'Description can not be more than 150 characters']
    },
    category: {
      type: String,
      required: [true, 'Must provide product category'],
      enum: {
        values: Object.values(EProductCategory),
        message: `{VALUE} is not supported, category must be one of: ${Object.values(EProductCategory).join(', ')}`
      }
    },
    thumbnail: {
      type: String,
      required: [true, 'Must provide product thumbnail'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Must provide product price'],
      default: 0
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Must provide product listed by'],
      ref: 'user'
    },
    tags: {
      type: [String]
    },
    soldItems: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5
    }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model('product', ProductSchema);
