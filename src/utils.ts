// eslint-disable-next-line no-unused-vars
import getStories, { Story } from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

export const project_id = 3918491;

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

export const setCollaborator = (story: Story): string[] | undefined => {
  const { Owner } = story;
  return collaboratorOwnerMatcher[Owner]
    ? [collaboratorOwnerMatcher[Owner]]
    : undefined;
};

export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const story: Story = {
  'Story name': 'DATA - data layer - Page Category',
  'User want':
    'as a user of analytics, I would like to be able to see page categories',
  'Tech Acceptance Criteria':
    '- Google Analytics push occurs on pageload\n' +
    '- Pushed data includes information about current page type',
  'Customer Acceptance criteria': '',
  'Data Acceptance Criteria':
    'how to set up detailed here\n' +
    'https://docs.google.com/spreadsheets/d/1yS7qlsTs3ksyFFSF5FHcC7-CwOg-Sllr9GSQ68gSApQ/edit#gid=0\n' +
    '\n' +
    'Categories are like:\n' +
    '\n' +
    'MHRA Homepage\t\n' +
    'Substance Page (with\tsubstance name)\n' +
    'Product Page\t(with product name)\n' +
    'Search Result Page (with\tkeyword typed)\n' +
    'Drug Index Page (with\tletter)\n' +
    'MHRA About Page\t\n' +
    'MHRA Accessibility\t\n' +
    'MHRA Cookies\t',
  'Testing Acceptance criteria':
    'that the we can capture the data layer element in Google Analytics',
  Epics: '',
  Value: '9',
  Effort: '5',
  Type: 'STORY',
  Kanban: 'Dev Review',
  Milestone: '',
  'Customer Segment?': '',
  Owner: 'Robin James Kerrison',
  SIZE: 'XS',
  'Governance Acceptance Criteria': '',
  Description: '',
  'KPI, Metrics and Value': '',
  'Github PR': '',
  Attachments: '',
  Reporting: '',
  Dependency: '',
  'Date In': '',
  'Dat Out': '',
  'Ticket ID': '165',
};

const setLabels = (story: Story): string => {
  const { Epics, Type } = story;

  const epics = Epics.length > 0 ? Epics : undefined;
  const type = Type.length > 0 ? Type : undefined;

  return `${epics?.includes('API') ? 'API POD' : epics ?? ''}, ${type ?? ''}`;
};

const setGhLabels = (story: Story): string[] | undefined =>
  setLabels(story)
    .split(', ')
    .filter(label => label.length > 1) ?? undefined;

export const issueTemplate = (story: Story): string => {
  return `
---
name: ${story['Story name']}
about: ${story['Customer Acceptance criteria']}
labels: ${setGhLabels(story)}
assignees: ${story.Owner}
milestone: ${story.Milestone}

---

### User want
${story['User want']}

**Customer acceptance criteria** 
${story['Customer Acceptance criteria']}

**Technical acceptance criteria**
${story['Tech Acceptance Criteria']}

**Data acceptance criteria**
${story['Data Acceptance Criteria']}

**Testing acceptance criteria** 
${story['Testing Acceptance criteria']}

**Size**
${story.SIZE}

**Value**
${story.Value}

**Effort**
${story.Effort}

### Exit Criteria met 
- [ ] Backlog
- [ ] Discovery
- [ ] Development 
- [ ] Quality Assurance 
- [ ] Release and Validate`;
};

export const createIssue = async (
  story: Story,
): Promise<Octokit.IssuesCreateResponse['id']> => {
  const labels = setGhLabels(story);

  const { data } = await octokit.issues.create({
    owner,
    repo,
    title: story['Story name'],
    body: issueTemplate(story),
    labels,
    assignees: setCollaborator(story),
    milestone: story['Milestone'].length > 1 ? 1 : undefined,
  });

  console.log({ issueData: data });

  const { id } = data;
  return id;
};
