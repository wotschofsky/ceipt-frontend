import Item from '../models/item.model';
import Receipt, { receiptProperties } from '../models/receipt.model';

async function addReceiptItems(receipt: any) {

  if (receipt == null) return null

  const itemIds = receipt.items.map((i: any) => i.id)

  const items = await Item.find({ $in: {_id: itemIds} })

  const newItems = receipt.items.map((i: any) => ({item: items.filter(j => j._id === i.id)[0], _id: i.id}))

  const newDoc = { ...receipt?.toObject(), items: newItems }

  return newDoc

}

const receiptController = {
  create: async (receiptData: typeof receiptProperties) => {

    const { image, items } = receiptData;

    console.log("creating receipt")

    const doc = await Receipt.create({ image, items });

    return await addReceiptItems(doc);
  },
  getById: async (receiptId: string) => {
    const doc = await Receipt.findOne({ _id: receiptId });


    return await addReceiptItems(doc)
  },
  getByOwnerUserId: async (ownerUserId: string) => {
    const docs = await Receipt.find({ ownerUserId });

    const newDocs = await Promise.all(docs.map(addReceiptItems))

    return newDocs;
  },
  getAll: async () => {

    const docs = await Receipt.find({});

    const newDocs = await Promise.all(docs.map(addReceiptItems))

    return newDocs
  },

};
export default receiptController;