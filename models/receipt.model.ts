import { randomUUID } from 'crypto';
import { model, Schema } from 'mongoose';

const receiptProperties = {
  _id: { type: String, default: randomUUID },

  img: { type: String, required: true },
  ownerUserId: { type: String, required: true },

  // items: {

  // }[]
};
const receiptModel = new Schema(receiptProperties);

const Receipt = model('receipt', receiptModel);

export default Receipt;
export { receiptProperties, receiptModel };
