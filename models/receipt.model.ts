import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

export interface IReceipt {
  _id?: string;
  image: string;
}

export const receiptProperties = {
  _id: { type: String, default: randomUUID },
  ownerName: { type: String, required: true },
  image: { type: String },
  products: {
    type: [
      {
        label: String,
        quantity: Number,
        score: Number,
        typology: String,
        group: String,
        item: String
      },
    ],
    required: true,
  },
  score: Number,
};

export const receiptSchema = new Schema<IReceipt>(receiptProperties);

export default mongoose.models.Receipt ||
  mongoose.model<IReceipt>('Receipt', receiptSchema);