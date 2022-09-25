import Fuse from 'fuse.js';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import fs from 'node:fs/promises';
import path from 'node:path';
import Papa from 'papaparse';

import initMongoose from '../../../utils/initMongoose';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();

  const dbData = await fs.readFile(
    path.resolve('./data/SEL CF for users-Tabelle 1.csv'),
    'utf8'
  );
  const parsedDb = Papa.parse(dbData, {
    delimiter: ';',
    header: true,
  }).data.map((item) => ({
    group: item['FOOD COMMODITY GROUP'],
    item: item['Food commodity ITEM'],
    footprint:
      item['Carbon Footprint kg CO2eq/kg or l of food ITEM'] &&
      parseFloat(
        item['Carbon Footprint kg CO2eq/kg or l of food ITEM'].replace(',', '.')
      ),
    typology: item['Food commodity TYPOLOGY'],
  }));

  const index = Fuse.createIndex(['item'], parsedDb);
  const fuse = new Fuse(parsedDb, {}, index);

  const productScores = req.body.products.map((p) => {
    const results = fuse.search(p.label, { limit: 1 });

    return {
      quantity: p.quantity,
      label: p.label,
      score: results.length > 0 ? results[0].item.footprint : null,
    };
  });

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
