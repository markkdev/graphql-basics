import { v4 } from 'uuid';

export default {
  createUser: (parent, { data }, { db: { users } }, info) => {
    const emailTaken = users.some(user => {
      return user.email === data.email;
    });
    if (emailTaken) {
      throw new Error('Email taken, please log in');
    }
    const user = {
      id: v4(),
      ...data
    };
    users.push(user);
    return user;
  },
  updateUser: (parent, { id, data }, { db: { users } }, info) => {
    const user = users.find(({ id: userId }) => id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof data.email === 'string') {
      const emailTaken = users.some(user => {
        return user.email === data.email;
      });
      if (emailTaken) {
        throw new Error('Email taken, please log in');
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  deleteUser: (parent, { id }, { db: { users, comments, posts } }, info) => {
    const userIndex = users.findIndex(({ id: userId }) => id === userId);
    if (userIndex < 0) {
      throw new Error('User not found');
    }
    posts = posts.filter(({ author, id: postId }) => {
      if (author === id) {
        comments = comments.filter(({ post }) => post !== postId);
        return false;
      }
      return true;
    });
    comments = comments.filter(({ author }) => author !== id);
    return users.splice(userIndex, 1)[0];
  },
  createPost: (parent, { data }, { db: { users, posts }, pubsub }, info) => {
    const authorExists = users.some(({ id }) => id === data.author);
    if (!authorExists) {
      throw new Error('User not found');
    }
    const post = {
      id: v4(),
      ...data
    };
    posts.push(post);
    if (data.published) {
      pubsub.publish('post', { post });
    }
    return post;
  },
  updatePost: (parent, { id, data }, { db: { posts } }, info) => {
    const post = posts.find(({ id: postId }) => id === postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    return post;
  },
  deletePost: (parent, { id }, { db: { comments, posts } }, info) => {
    const postIndex = posts.findIndex(({ id: postId }) => id === postId);
    if (postIndex < 0) {
      throw new Error('Post not found');
    }
    comments = comments.filter(({ post }) => {
      return post !== id;
    });
    return posts.splice(postIndex, 1)[0];
  },
  createComment: (
    parent,
    { data },
    { db: { users, comments, posts }, pubsub },
    info
  ) => {
    const authorExists = users.some(({ id }) => id === data.author);
    if (!authorExists) {
      throw new Error('User not found');
    }
    const postExists = posts.some(
      ({ id, published }) => id === data.post && published
    );
    if (!postExists) {
      throw new Error('Post not found');
    }
    const comment = {
      id: v4(),
      ...data
    };
    comments.push(comment);
    pubsub.publish(`comment ${data.post}`, { comment });
    return comment;
  },
  deleteComment: (parent, { id }, { db: { comments } }, info) => {
    const commentIndex = comments.findIndex(
      ({ id: commentId }) => id === commentId
    );
    if (commentIndex < 0) {
      throw new Error('Comment not found');
    }
    return comments.splice(commentIndex, 1)[0];
  },
  updateComment: (parent, { id, data }, { db: { comments } }, info) => {
    const comment = comments.find(({ id: commentId }) => id === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    return comment;
  }
};
