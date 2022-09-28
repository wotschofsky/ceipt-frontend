import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import assetStorage from '../../../../services/assetStorage';
import ocrClient from '../../../../services/ocrClient';
import calculateOverallScore from '../../../../utils/calculateOverallScore';
import toFilteredStr from '../../../../utils/toFilteredStr';
import toScoredItem from '../../../../utils/toScoredItem';

const handler = nc({
  onError(error, _req, res: NextApiResponse) {
    res
      .status(500)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(assetStorage().saveSingleFromReq);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  // @ts-ignore
  const fileData = await assetStorage().readSingle(req.file.filename)

  // @ts-ignore
  const rawStrings = await ocrClient().getStringsFromReceipt(fileData, req.file.mimetype)

  const filteredStrings = rawStrings.flatMap(toFilteredStr)

  const products = await Promise.all(
    filteredStrings.map(label => toScoredItem(label, 1))
  );
  // @ts-ignore
  const score = calculateOverallScore(products)

  res.json({
    ok: true,
    data: {
      products,
      score,
    },
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
