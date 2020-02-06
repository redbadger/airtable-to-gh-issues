import getStories from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const { GH_TOKEN } = process.env;

const octokit = new Octokit({ auth: GH_TOKEN, log: console });

// project_id: 3918491
// column_id: 7922275

const card = {
  'Story name': 'SEARCH RESULTS - Disclaimer FUNCTIONALITY',
  'User want':
    'As a user I want to feel informed about the condition / status of the information of a drug provided by MHRA on my first visit, so that I have the most accurate information',
  'Tech Acceptance Criteria':
    'Please go to https://rbmhramip.blob.core.windows.net/policies/index.html\n' +
    '\n',
  'Customer Acceptance criteria':
    '1. Show once per visit underneath the "product page" copy on the search results page\n' +
    '2. Include the checkbox \n' +
    '3. Hide search results until checkbox has been checked',
  'Data Acceptance Criteria': '',
  'Testing Acceptance criteria': '',
  Epics: '',
  Value: '',
  Effort: '',
  Type: 'STORY',
  Kanban: 'Done',
  Milestone: 'Skateboard Lite 🛹',
  'Customer Segment?': '',
  Owner: 'Steve Lindsay',
  SIZE: '',
  'Governance Acceptance Criteria': '',
  Description: '',
  'KPI, Metrics and Value': '',
  'Github PR': '',
  Attachments:
    'HP and About wording for new Stellent platform.docx (https://dl.airtable.com/.attachments/a132a4b6f436996071a1ae20d395675d/d03c8116/HPandAboutwordingfornewStellentplatform.docx)',
  Reporting: '',
  Dependency: '',
  'Date In': '',
  'Dat Out': '',
  'Ticket ID': '89',
};

const start = async () => {
  const stories = await getStories();
  console.log({ stories });

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
  //   column_id: 7922275,
  //   note: 'test',
  // });

  // console.log({ data });
};

start();
