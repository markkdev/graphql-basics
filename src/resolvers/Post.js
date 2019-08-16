export default {
  author: (parent, args, { db: { users } }, info) =>
    users.find(({ id }) => id === parent.author),
  comments: (parent, args, { db: { comments } }, info) =>
    comments.filter(({ post }) => post === parent.id)
};
