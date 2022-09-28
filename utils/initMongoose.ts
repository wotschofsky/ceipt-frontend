import mongoose from 'mongoose';
import logger from '../services/logger';

let instance: typeof mongoose;

const initMongoose = async () => {
  if (!instance) {

    try {
      instance = await mongoose.connect(process.env.MONGO_URL as string);

      await import('../models/receipt.model');
    } catch (err) {

      logger("mongoDb").err.mongoose.connect(err, process.env.MONGO_URL as string)
    }
  }
  return instance;
};

export default initMongoose;
