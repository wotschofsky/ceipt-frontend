import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';

export default nc({}).get(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await receiptController.create(req.body);

  if (!data) {
    res.status(400).json({ ok: false, msg: 'failed to create receipt' });
    return;
  }

  res.json({ ok: true, data });
});
