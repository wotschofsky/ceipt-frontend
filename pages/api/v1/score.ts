import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Product } from '../../../definitions/Receipt';

import calculateOverallScore from '../../../utils/calculateOverallScore';
import toScoredItem from '../../../utils/toScoredItem';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  const products = await Promise.all(
    (req.body as { products: Product[] }).products.map((p) => toScoredItem(p.label, p.quantity))
  );
  const score = calculateOverallScore(products);

  res.json({
    ok: true,
    data: {
      products,
      score,
    },
  });
});
export default handler;
