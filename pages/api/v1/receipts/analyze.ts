import axios from 'axios';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import ocrClient from '../../../../services/ocrClient';

import calculateOverallScore from '../../../../utils/calculateOverallScore';
import initMongoose from '../../../../utils/initMongoose';
import toFilteredStr from '../../../../utils/toFilteredStr';
import toScoredItem from '../../../../utils/toScoredItem';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) =>
      cb(null, `${randomUUID()}${path.extname(file.originalname)}`),
  }),
});

const handler = nc({
  onError(error, _req, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single('image'));

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  // @ts-ignore
  const filePath = path.resolve('./public/uploads', req.file.filename);

  const fileData = await fs.readFile(filePath);

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
