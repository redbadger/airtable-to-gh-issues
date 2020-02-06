import getStories, { Story } from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const { GH_TOKEN } = process.env;

const octokit = new Octokit({ auth: GH_TOKEN, log: console });

// project_id: 3918491
// column_id: 7922275

const card: Story = {
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

// const note = (story: Story): string => `
// # ${story['Story name']}

// ## Epics
//   ${story['Epics']}

// ## Milestone
//   ${story['Milestone']}

// ## Type
//   ${story['Type']}

// ## Owner
//   ${story['Owner']}

// ## Dependency
//   ${story['Dependency']}

// ## Date in
//   ${story['Date In']}

// ## Date out
//   ${story['Dat Out']}

// ## Ticket ID
//   ${story['Ticket ID']}

// ## User want
//   ${story['User want']}

// ## Value
//   ${story['Value']}

// ## Effort
//   ${story['Effort']}

// ## Size
//   ${story['SIZE']}

// ## Customer Segment?
//   ${story['Customer Segment?']}

// ## Tech Acceptance Criteria
//   ${story['Tech Acceptance Criteria']}

// ## Customer Acceptance criteria
//   ${story['Customer Acceptance criteria']}

// ## Testing Acceptance criteria
//   ${story['Testing Acceptance criteria']}

// ## Governance Acceptance Criteria
//   ${story['Governance Acceptance Criteria']}

// ## Description
//   ${story['Description']}

// ## KPI, Metrics and Value
//   ${story['KPI, Metrics and Value']}

// ## Attachments
//   ${story['Attachments']}

// ## Reporting
//   ${story['Reporting']}
// `;

const note = (story: Story): string =>
  Object.entries(story)
    .map(([key, value]) => {
      if (key === 'Story name') {
        return `# ${value}\n\n`;
      }

      if (key === 'Kanban') {
        return;
      }

      if (value.length > 0) {
        return `## ${key}\n${value}\n\n`;
      }
    })
    .join('');

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
  const { data } = await octokit.projects.createCard({
    column_id: 7922275,
    note: note(card),
  });

  console.log({ data });
};

start();
