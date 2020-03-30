import { createCard } from './utils';

import getStories from './get-stories';

const start = async () => {
  const stories = await getStories();

  Promise.all(stories.map(createCard));
};

start();
