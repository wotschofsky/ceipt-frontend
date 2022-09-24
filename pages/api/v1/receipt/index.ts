import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';

const handler = nc();

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await receiptController.getAll();
  res.json({ ok: true, data });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await receiptController.create(req.body);
  res.json({ ok: true, data });
});

export default handler;
