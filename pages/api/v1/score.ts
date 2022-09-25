import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import calculateOverallScore from '../../../utils/calculateOverallScore';
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
      score: calculateOverallScore(productScores),
    },
  });
});

export default handler;
