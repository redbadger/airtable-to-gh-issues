import { octokit, createIssue, setColumn } from './utils';

import getStories from './get-stories';

const start = async () => {
  const stories = await getStories();

  console.log({ stories });

  // Promise.all(
  //   stories.map(async story => {
  //     console.log(story);
  //     const id = await createIssue(story);
  //     const { data } = await octokit.projects.createCard({
  //       column_id: setColumn(story),
  //       content_id: id,
  //       content_type: 'Issue',
  //     });
  //     console.log({ data });
  //   }),
  // );
};

// const start = async () => {
//   const stories = await getStories();

//   Promise.all(
//     stories.map(async story => {
//       console.log(story);
//       const id = await createIssue(story);
//       const { data } = await octokit.projects.createCard({
//         column_id: setColumn(story),
//         content_id: id,
//         content_type: 'Issue',
//       });
//       console.log({ data });
//     }),
//   );
// };

start();
