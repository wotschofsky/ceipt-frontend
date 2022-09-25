import {
  TranslateClient,
  TranslateTextCommand,
} from '@aws-sdk/client-translate';
import Fuse from 'fuse.js';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import fs from 'node:fs/promises';
import path from 'node:path';
import Papa from 'papaparse';

import initMongoose from '../../../utils/initMongoose';

const client = new TranslateClient({ region: 'eu-central-1' });

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
    // @ts-ignore
  }).data.map((item: Record<string, string>) => ({
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

  const productScores = await Promise.all(
    req.body.products.map(async (p: any) => {
      const data = await client.send(
        new TranslateTextCommand({
          Text: p.label,
          SourceLanguageCode: 'de',
          TargetLanguageCode: 'en',
        })
      );

      const results = fuse.search(data.TranslatedText as string, {
        limit: 1,
      });

      return {
        quantity: p.quantity,
        label: p.label,
        score: results.length > 0 ? results[0].item.footprint : null,
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
