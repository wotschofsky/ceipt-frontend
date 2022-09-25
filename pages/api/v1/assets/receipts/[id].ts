import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { toSvgStr } from '../../../../../components/ReceiptSvg';
import receiptController from '../../../../../controllers/receipt.controller';


export default nc({}).get(async (req: NextApiRequest, res: NextApiResponse) => {

  const receiptId = req.query.id as string;

  const data = await receiptController.getById(receiptId);

  if (!data) {

    res.status(404).send("not found")

    return
  }
  const str = toSvgStr(data)

  res.setHeader("Content-Type", "image/svg+xml").send(str)

  // res.send(str)
});
