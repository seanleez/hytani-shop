import mongoose from 'mongoose';

export const connectDatabase = async () => {
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
