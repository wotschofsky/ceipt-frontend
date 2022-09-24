import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';
import initMongoose from '../../../../utils/initMongoose';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const data = await receiptController.getAll();

  res.json({ ok: true, data });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const data = await receiptController.create(req.body);

  res.json({ ok: true, data });
});

export default handler;
