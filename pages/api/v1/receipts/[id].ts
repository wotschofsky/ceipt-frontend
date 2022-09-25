import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';

export default nc({}).get(async (req: NextApiRequest, res: NextApiResponse) => {

  const receiptId = req.query.id as string;

  const data = await receiptController.getById(receiptId);

  if (!data) {
    res.status(404).json({ ok: false, msg: 'could not find receipt' });
    return;
  }
  res.json({ ok: true, data });
});
