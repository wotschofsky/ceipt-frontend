import mongoose from 'mongoose';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

import itemModel from '../../../../models/item.model';
import initMongoose from '../../../../utils/initMongoose';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) =>
      cb(null, `${randomUUID()}${path.extname(file.originalname)}`),
  }),
});

const handler = nc({
  onError(error, req, res) {
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

  const allItems = await itemModel.find({});

  const items = Array(Math.round(Math.random() * 10) + 10)
    .fill(null)
    .map(() => {
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      return {
        count: Math.round(Math.random() * 2) + 1,
        item: randomItem._id,
      };
    });

  const data = {
    // @ts-ignore
    image: req.file.filename,
    items,
  };

  if (!data) {
    res.status(400).json({ ok: false, msg: 'failed to create receipt' });
    return;
  }

  res.json({ ok: true, data });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
