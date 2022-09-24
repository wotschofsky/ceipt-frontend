import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import initMongoose from '../../../utils/initMongoose';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const productScores = req.body.products.map((p) => {
    return {
      quantity: p.quantity,
      label: p.label,
      score: Math.random(),
    };
  });

  res.json({
    ok: true,
    data: {
      products: productScores,
      score:
        productScores.reduce((acc, p) => acc + p.quantity * p.score, 0) /
        productScores.reduce((acc, p) => acc + p.quantity, 0),
    },
  });
});

export default handler;
