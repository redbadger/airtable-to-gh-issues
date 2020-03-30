// eslint-disable-next-line no-unused-vars
import { Story } from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

export const project_id = 4144455;

const { GH_TOKEN } = process.env;
export const owner = 'MHRA';
export const repo = 'products';

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

export const columnsMatcher = {
  Uncategorized: 8514448,
  'To do ': 8514437,
  'Sprint Planning': 8514446,
  'In Progress': 8514449,
  'Review ': 8514447,
  'Done ': 8514450,
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

export const setColumn = (story: Story): number => {
  const { Kanban } = story;
  // @ts-ignore
  return columnsMatcher[Kanban] ?? 8514448;
};

export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const cardTemplate = (story: Story): string => {
  return `
## ${story.Name}

###### Work stream: ${story['Work Stream']}

###### Epic: ${story.Epic}

###### Notes:
${story.Notes}
`;
};

export const listProjects = async () => {
  const { data } = await octokit.projects.listForOrg({
    org: 'MHRA',
  });
  console.log({ data });
};

export const createColumn = async (name: string) => {
  const data = octokit.projects.createColumn({
    project_id,
    name,
  });
  console.log({ data });
};

export const getProjectColumns = async () => {
  const { data } = await octokit.projects.listColumns({
    project_id,
  });

  console.log({ data });
};

export const createCard = async (story: Story) => {
  const { data } = await octokit.projects.createCard({
    column_id: setColumn(story),
    note: cardTemplate(story),
  });

  console.log({ data });
};
