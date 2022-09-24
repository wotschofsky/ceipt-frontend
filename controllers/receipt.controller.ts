import Receipt, { receiptProperties } from '../models/receipt.model';

const receiptController = {
  create: async (receiptData: typeof receiptProperties) => {
    const { img, ownerUserId } = receiptData;

    const doc = await Receipt.create({ img, ownerUserId });

    return doc?.toObject();
  },
  getById: async (receiptId: string) => {
    const doc = await Receipt.findOne({ _id: receiptId });

    return doc?.toObject();
  },
  getByOwnerUserId: async (ownerUserId: string) => {
    const docs = await Receipt.find({ ownerUserId });

    return docs.map((i) => i.toObject());
  },
};
export default receiptController;
