// eslint-disable-next-line no-unused-vars
import getStories, { Story } from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const { GH_TOKEN } = process.env;

const octokit = new Octokit({
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

// project_id: 3918491
// column_id: 7922275

const note = (story: Story): string =>
  Object.entries(story)
    .map(([key, value]) => {
      if (key === 'Story name') {
        return `#### ${value}\n\n`;
      }

      if (key === 'Kanban') {
        return;
      }

      if (value.length > 0) {
        return `##### ${key}\n${value}\n\n`;
      }
    })
    .join('');

const columnsMatcher = {
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

const setColumn = (story: Story): number => {
  const { Kanban } = story;
  return columnsMatcher[Kanban] ?? 7922933;
};

const start = async () => {
  const stories = await getStories();
  // console.log({ stories });

  // Create project for a repo
  // const { data } = await octokit.projects.createForRepo({
  //   owner: 'MHRA',
  //   repo: 'products',
  //   name: 'Products',
  // });

  // Create column for  a project
  // const { data } = await octokit.projects.createColumn({
  //   project_id: 3918491,
  //   name: 'Backlog',
  // });

  // Create card for a column
  // const { data } = await octokit.projects.createCard({
  //   column_id: 3918491,
  // });

  Promise.all(
    stories.map(async story => {
      const { data } = await octokit.projects.createCard({
        column_id: setColumn(story),
        note: note(story),
      });
      console.log({ data });
    }),
  );
};

start();
