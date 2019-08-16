export default {
  comment: {
    subscribe: (parent, { postId }, { db: { posts }, pubsub }, info) => {
      const post = posts.find(
        ({ id, published }) => id === postId && published
      );
      if (!post) {
        throw new Error('Post not found');
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator(`post`)
  }
};
