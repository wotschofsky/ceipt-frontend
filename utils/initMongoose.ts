import mongoose from 'mongoose';

let instance: typeof mongoose;

const initMongoose = async () => {


  if (!instance) {
    instance = await mongoose.connect(process.env.MONGO_URL as string);

    await import('../models/item.model');
    await import('../models/receipt.model');

    // const ding = await import('../models/receipt.model')
    // await ding.default.remove()
  }
  return instance;
};

export default initMongoose;
