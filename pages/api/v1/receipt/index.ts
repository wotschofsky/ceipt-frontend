import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';

export default nc({}).get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await receiptController.getAll();
  res.json({ ok: true, data });
});
