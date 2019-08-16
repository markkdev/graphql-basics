export default {
  author: (parent, args, { db: { users } }, info) =>
    users.find(({ id }) => id === parent.author),
  post: (parent, args, { db: { posts } }, info) =>
    posts.find(({ id }) => id === parent.post)
};
