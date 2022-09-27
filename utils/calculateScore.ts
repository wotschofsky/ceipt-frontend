import {
  TranslateClient,
  TranslateTextCommand,
} from '@aws-sdk/client-translate';
import Fuse from 'fuse.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import Papa from 'papaparse';

let fuseInstance: Fuse<{
  group: string;
  item: string;
  footprint: number | '';
  typology: string;
}>;

const loadDatabase = async () => {
  if (fuseInstance) {
    return fuseInstance;
  }

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

  fuseInstance = fuse;

  return fuse;
};

const client = new TranslateClient({ region: 'eu-central-1' });

const calculateScore = async (productLabel: string) => {
  const fuse = await loadDatabase();

  const data = await client.send(
    new TranslateTextCommand({
      Text: productLabel,
      SourceLanguageCode: 'de',
      TargetLanguageCode: 'en',
    })
  );

  const results = fuse.search(data.TranslatedText as string, {
    limit: 1,
  });

  if (!results.length) return null

  const { item } = results[0]

  return item
};

export default calculateScore;
