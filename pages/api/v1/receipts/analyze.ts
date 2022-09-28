import { NextApiResponse } from 'next';
import nc from 'next-connect';

import assetStorage, { MulterRequest } from '../../../../services/assetStorage';
import ocrClient from '../../../../services/ocrClient';
import calculateOverallScore from '../../../../utils/calculateOverallScore';
import toFilteredStr from '../../../../utils/toFilteredStr';
import toScoredItem from '../../../../utils/toScoredItem';

const handler = nc({
  onError(error, _req, res: NextApiResponse) {
    res.status(500).json({ error: `Something Went Wrong: '${error.message}'` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method Not Allowed: '${req.method}'` });
  },
});

handler.use(assetStorage().saveSingleFromReq);

handler.post(async (req: MulterRequest, res: NextApiResponse) => {

  const { filename, mimetype } = req.file

  const fileData = await assetStorage().readSingle(filename)

  const rawStrings = await ocrClient().getStringsFromReceipt(fileData, mimetype)

  const filteredStrings = rawStrings.flatMap(toFilteredStr)

  const products = await Promise.all(
    filteredStrings.map(label => toScoredItem(label, 1))
  );
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
