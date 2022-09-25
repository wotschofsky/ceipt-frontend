import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../../controllers/receipt.controller';
import getSvgStr from '../../../../../utils/getSvgStr';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

  const receiptId = req.query.id as string;
  const data = await receiptController.getById(receiptId);

  if (!data) {
    res.status(404).send('not found');
    return;
  }

  res.setHeader('Content-Type', 'image/svg+xml').send(getSvgStr(data));
});

export default handler;
