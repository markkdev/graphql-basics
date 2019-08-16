export default {
  users: (parent, { query }, { db: { users } }, info) =>
    users.filter(({ name }) =>
      query ? name.toLowerCase().includes(query.toLowerCase()) : true
    ),
  posts: (parent, { query }, { db: { posts } }, info) =>
    posts.filter(({ title, body }) =>
      query
        ? title.toLowerCase().includes(query.toLowerCase()) ||
          body.toLowerCase().includes(query.toLowerCase())
        : true
    ),
  comments: (parent, args, { db: { comments } }, info) => comments,
  me: () => ({
    id: 'abc123',
    name: 'Mark Khuzam',
    email: 'mark@markk.dev',
    age: 26
  }),
  post: () => ({
    id: 'post123',
    title: 'My first post',
    body: 'My bomb body',
    published: false
  })
};
