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
  'Customer Acceptance criteria': string;
  'Customer Segment?': string;
  'Dat Out': string;
  'Data Acceptance Criteria': string;
  'Date In': string;
  'Github PR': string;
  'Governance Acceptance Criteria': string;
  'KPI, Metrics and Value': string;
  'Story name': string;
  'Tech Acceptance Criteria': string;
  'Testing Acceptance criteria': string;
  'Ticket ID': string;
  'User want': string;
  Attachments: string;
  Dependency: string;
  Description: string;
  Effort: string;
  Epics: string;
  Kanban:
    | 'Ideas'
    | 'Backlog'
    | 'Discovery'
    | 'Ready for DUXD'
    | 'DUXD'
    | 'DUXD Review'
    | 'Ready for Dev'
    | 'Dev'
    | 'Dev Review'
    | 'Ready for QA'
    | 'Quality Assurance'
    | 'Ready for UAT'
    | 'Ready for Release'
    | 'Release & Validate'
    | 'Done this week'
    | 'Done';
  Milestone: string;
  Owner: string;
  Reporting: string;
  SIZE: string;
  Type: string;
  Value: string;
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
