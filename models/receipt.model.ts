import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

export interface IReceipt {
  _id?: string;
  image: string;
}

export const receiptProperties = {
  _id: { type: String, default: randomUUID },
  image: { type: String, required: true },
  // ownerUserId: { type: String, required: true },
  items: { type: [{ id: String, amount: Number }], required: true }
};

export const receiptSchema = new Schema<IReceipt>(receiptProperties);

export default mongoose.models.Receipt ||
  mongoose.model<IReceipt>('Receipt', receiptSchema);
