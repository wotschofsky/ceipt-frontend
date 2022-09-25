import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import calculateScore from '../../../utils/calculateScore';
import initMongoose from '../../../utils/initMongoose';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const productScores = await Promise.all(
    req.body.products.map(async (p: any) => {
      return {
        quantity: p.quantity,
        label: p.label,
        score: await calculateScore(p.label),
      };
    })
  );

  res.json({
    ok: true,
    data: {
      products: productScores,
      score:
        productScores.reduce(
          (acc, p) => (p.score ? acc + p.quantity * p.score : acc),
          0
        ) /
        productScores.reduce((acc, p) => (p.score ? acc + p.quantity : acc), 0),
    },
  });
});

export default handler;
