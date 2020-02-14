import { octokit, project_id } from './utils';

const start = async () => {
  const { data } = await octokit.repos.listCollaborators({
    owner: 'MHRA',
    repo: 'products',
  });

  const colaborators = data.map(collaborator => {
    const { id, login } = collaborator;
    return { id, login };
  });

  console.log({ colaborators });
};

start();
