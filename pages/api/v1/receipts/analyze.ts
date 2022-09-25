import axios from 'axios';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import calculateOverallScore from '../../../../utils/calculateOverallScore';
import calculateScore from '../../../../utils/calculateScore';
import initMongoose from '../../../../utils/initMongoose';

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

  const response = await axios(
    'http://localhost:8080/receipt-analyses?lang=deu',
    {
      method: 'POST',
      data: fileData,
      headers: {
        // @ts-ignore
        'Content-Type': req.file.mimetype,
      },
    }
  );
  console.log(response)

  const filteredStrings = [];
  for (const string of response.data.strings as string[]) {
    const lowerString = string.toLowerCase();
    if (
      lowerString.includes('zahlen') ||
      lowerString.includes('summe') ||
      lowerString.includes('total')
    ) {
      break;
    }

    const filteredString = lowerString
      .replace(/[^a-zA-ZäÄöÖüÜ0-9\/\-,\.\s]+/g, '')
      .replace(/\s\s+/g, ' ')
      .trim();

    if (!/[0-9]/g.test(filteredString) || !/[a-zA-Z]/g.test(filteredString)) {
      continue;
    }

    if (!/[0-9]+\.[0-9]+/.test(filteredString.replace(',', '.'))) {
      continue;
    }

    const cleanedString = string
      // Remove all non-text characters
      .replace(/[^a-zA-ZäÄöÖüÜ\/\-\s]+/g, '')
      // Remove all double spaces
      .replace(/\s\s+/g, ' ')
      // Remove single characters
      .replace(/\s[a-zA-ZäÄöÖüÜ0-9]\s/g, ' ')
      .replace(/\s[a-zA-ZäÄöÖüÜ0-9]$/g, ' ')
      .replace(/^[a-zA-ZäÄöÖüÜ0-9]\s/g, ' ')
      // other adjustment
      .replace(/^[eE][a-zA-ZäÄöÖüÜ]*\s/, 'ein ')
      .trim();

    filteredStrings.push(cleanedString);
  }

  const productScores = await Promise.all(
    filteredStrings.map(async (label) => {
      return {
        quantity: 1,
        label,
        score: await calculateScore(label),
      };
    })
  );

  res.json({
    ok: true,
    data: {
      products: productScores,
      // @ts-ignore
      score: calculateOverallScore(productScores),
    },
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
