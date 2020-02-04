// import getStories from './get-stories';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const { GH_TOKEN } = process.env;

const octokit = new Octokit({ auth: GH_TOKEN, log: console });

const start = async () => {
  // const stories = await getStories();
  // console.log({ stories });

  const { data } = await octokit.issues.create({
    owner: 'MHRA',
    repo: 'products',
    title: 'Test para Aine',
  });

  console.log({ data });
};

start();
