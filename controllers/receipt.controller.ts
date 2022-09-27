import { Document } from 'mongoose';
import Receipt from '../definitions/Receipt';
import ReceiptModel, { receiptProperties } from '../models/receipt.model';

function normalize(receipt: Document<Receipt>) {

  if (!receipt) {
    return null;
  }
  const normalizedReceipt = { ...receipt.toObject(), products: receipt.products.map(i => ({ ...i.toObject(), _id: i._id.toString() })) }

  return normalizedReceipt
}

const receiptController = {
  create: async (receiptData: typeof receiptProperties) => {

    const doc = await ReceiptModel.create({
      image: receiptData.image,
      ownerName: receiptData.ownerName,
      products: receiptData.products,
      score: receiptData.score,
    });
    return await normalize(doc);
  },
  getById: async (receiptId: string) => {
    const doc = await ReceiptModel.findOne({ _id: receiptId });

    return await normalize(doc);
  },
  getByOwnerUserId: async (ownerUserId: string) => {
    const docs = await ReceiptModel.find({ ownerUserId });

    return docs.map(normalize);
  },
  getAll: async () => {
    const docs = await ReceiptModel.find({});

    return docs.map(normalize);
  },
};
export default receiptController;
