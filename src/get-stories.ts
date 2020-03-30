import { createReadStream } from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

const airTableStoriesPath = path.resolve(
  __dirname,
  '../data/airtable-stories.csv',
);

const parser = csvParse(
  { delimiter: ',', bom: true, columns: true },
  (error, data) => {
    if (error) {
      throw Error(`Unable to parse CSV, ${error}.`);
    }
    return data;
  },
);

export interface Story {
  Name: string;
  'Work Stream': string;
  'Assigned to': string;
  Epic: string;
  Kanban: string;
  Notes: string;
}

const getStories = async (): Promise<Story[]> => {
  const storiesStream = createReadStream(airTableStoriesPath).pipe(parser);
  const stories: Story[] = [];

  return new Promise((resolve, reject) => {
    storiesStream.on('error', error => reject(error));
    storiesStream.on('data', story => stories.push(story));
    storiesStream.on('end', () => resolve(stories));
  });
};

export default getStories;
