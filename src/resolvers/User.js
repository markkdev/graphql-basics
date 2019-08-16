export default {
  posts: (parent, args, { db: { posts } }, info) =>
    posts.filter(({ author }) => author === parent.id),
  comments: (parent, args, { db: { comments } }, info) =>
    comments.filter(({ author }) => author === parent.id)
};
