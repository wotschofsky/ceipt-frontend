import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

export interface IItem {
  _id?: string;
  name: string;
  isVegan: boolean;
  isVegetarian: boolean;
  weightGrams: number;
  co2ProKg: number;
}

export const itemProperties = {
  _id: { type: String, default: randomUUID },
  name: { type: String, required: true },
  isVegan: { type: Boolean, required: true },
  isVegetarian: { type: Boolean, required: true },
  weightGrams: Number,
  co2ProKg: Number,
};

export const itemSchema = new Schema<IItem>(itemProperties);

export default mongoose.models.Item ||
  mongoose.model<IItem>('Item', itemSchema);
