import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';
import initMongoose from '../../../../utils/initMongoose';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  console.log("calling getAll recipes handler")

  await initMongoose();

  console.log("still doin this")

  const data = await receiptController.getAll();

  res.json({ ok: true, data });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("calling receipt creation handler")

  await initMongoose();

  

  const data = await receiptController.create(req.body);

  console.log("created receipt")

  res.json({ ok: true, data });
});

export default handler;
