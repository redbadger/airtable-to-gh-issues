// eslint-disable-next-line no-unused-vars
import getStories, { Story } from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

export const project_id = 3918491;

const { GH_TOKEN } = process.env;

export const octokit = new Octokit({
  auth: GH_TOKEN,
  log: console,
  retry: {
    enabled: true,
  },
  throttle: {
    onRateLimit: (retryAfter: number, options: { [key: string]: any }) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );

      if (options.request.retryCount === 0) {
        // only retries once
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter: number, options: { [key: string]: any }) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`,
      );
    },
  },
});

// column_id: 7922275

export const columnsMatcher = {
  Uncategorized: 7922933,
  Ideas: 7922932,
  Backlog: 7922275,
  Discovery: 7922934,
  'Ready for DUXD': 7922935,
  DUXD: 7922936,
  'DUXD Review': 7922938,
  'Ready for Dev': 7922946,
  Dev: 7922948,
  'Dev Review': 7922950,
  'Ready for QA': 7922952,
  'Quality Assurance': 7922953,
  'Ready for UAT': 7922957,
  'Ready for Release': 7922958,
  'Release & Validate': 7922959,
  'Done this week': 7922960,
  Done: 7922961,
};

export const unique = (array: any[]) => {
  const seen = new Set();
  return array.filter(item => {
    if (!seen.has(item)) {
      seen.add(item);
      return true;
    }
  });
};

export const labels = [
  'STORY',
  '"API Pod\n"',
  'TASK',
  'Data Implementation',
  'BLOCKED',
  'Search & Navigation',
  'Tech Infrastructure',
  'Tech Infrastructure,15 - PARs and SPARs',
  'BUG',
  'Automatic Batch Process',
];

export const owners = [
  'Robin James Kerrison',
  'Pedro Martin',
  'Tim Lee',
  'Sandra Coen',
  'Craig Anderson',
];

export const milestones = ['Skateboard 🛹'];

export const collaborators = [
  { id: 76330, login: 'craiga' },
  { id: 203552, login: 'StuartHarris' },
  { id: 5957010, login: 'roughprada' },
  { id: 6122821, login: 'DimplePatel' },
  { id: 6436551, login: 'TimboTambo' },
  { id: 7150842, login: 'rjkerrison' },
  { id: 10330222, login: 'pataruco' },
  { id: 31472658, login: 'simtor' },
  { id: 45387047, login: 'm-doughty' },
  { id: 50627292, login: 'ainemckay' },
  { id: 56549161, login: 'JMC2000' },
  { id: 58080926, login: 'chel-mhra' },
  { id: 58703117, login: 'sandracoen1405' },
  { id: 58777926, login: 'Georgie-RedBadger' },
  { id: 59173729, login: 'James-Dodd' },
];

const collaboratorOwnerMatcher: { [key: string]: string } = {
  'Robin James Kerrison': 'rjkerrison',
  'Pedro Martin': 'pataruco',
  'Tim Lee': 'TimboTambo',
  'Sandra Coen': 'sandracoen1405',
  'Craig Anderson': 'craiga',
};

export const setColumn = (story: Story): number => {
  const { Kanban } = story;
  return columnsMatcher[Kanban] ?? 7922933;
};

export const setCollaborator = (story: Story): string | undefined => {
  const { Owner } = story;
  return collaboratorOwnerMatcher[Owner];
};
