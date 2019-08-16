const users = [
  {
    id: '1',
    name: 'Mark Khuzam',
    email: 'mark@markk.dev',
    age: 26
  },
  {
    id: '2',
    name: 'Maya Khuzam',
    email: 'maya@markk.dev',
    age: 21
  },
  {
    id: '3',
    name: 'Zaher Khuzam',
    email: 'zack@markk.dev',
    age: 54
  }
];

const posts = [
  {
    id: '1',
    title: 'My first post',
    body: 'My bomb body',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'My second post',
    body: 'two is nice',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'My third post',
    body: 'threes a party',
    published: true,
    author: '1'
  }
];

const comments = [
  {
    id: '1',
    text: 'Troll Comment',
    author: '2',
    post: '1'
  },
  {
    id: '2',
    text: 'Second Comment',
    author: '3',
    post: '2'
  },
  {
    id: '3',
    text: 'Dungeon Master',
    author: '1',
    post: '2'
  },
  {
    id: '4',
    text: 'Panda Funk is broken now',
    author: '3',
    post: '3'
  }
];

export default { users, posts, comments };
