import { ImportTerminologyRequestFilterSensitiveLog } from '@aws-sdk/client-translate';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import calculateOverallScore from '../../../utils/calculateOverallScore';
import calculateScore from '../../../utils/calculateScore';
import initMongoose from '../../../utils/initMongoose';
import toScoredItem from '../../../utils/toScoredItem';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const products = await Promise.all(
    req.body.products.map((p: any) => toScoredItem(p.label, p.quantity))
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
