const products = require('./products.json');
require('dotenv').config();
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
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
        values: Object.values(['FURNITURE', 'ACCESSORY', 'CLOTHING', 'ELECTRONICS', 'TOOLS', 'OTHER']),
        message: `{VALUE} is not supported, category must be one of: ${Object.values([
          'FURNITURE',
          'ACCESSORY',
          'CLOTHING',
          'ELECTRONICS',
          'TOOLS',
          'OTHER'
        ]).join(', ')}`
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

const ProductModel = mongoose.model('product', ProductSchema);

const connectDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to the db!');
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  try {
    await connectDatabase();
    await ProductModel.deleteMany();

    const convertedProducts = products.map(product => ({
      ...product,
      listedBy: product.listedBy.$oid || product.listedBy
    }));

    await ProductModel.create(convertedProducts);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
