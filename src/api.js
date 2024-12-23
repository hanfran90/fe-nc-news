import axios from "axios";
const api = axios.create({
  baseURL: "https://nc-news-m2v4.onrender.com/api",
});

const getArticles = (queries) => {
  return api.get("/articles", { params: queries }).then((response) => {
    return response.data.articles;
  });
};

const getSingleArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

const getArticleComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

const patchVoteCountArticle = (article_id, increment) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data;
    });
};

const patchVoteCountComment = (comment_id, increment) => {
  return api
    .patch(`/comments/${comment_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data;
    });
};

const postComment = (article_id, comment) => {
  return api
    .post(`/articles/${article_id}/comments`, comment)
    .then((response) => {
      return response.data;
    });
};

const getUsers = () => {
  return api.get("/users").then(({ data }) => {
    return data.users;
  });
};

const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`).then((response) => {
    return response.data;
  });
};

const getTopics = () => {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
};

const getArticlesByTopic = (topic) => {
  return api.get(`/articles/?topic=${topic}`).then((response) => {
    return response.data.articles;
  });
};

export {
  getArticles,
  getSingleArticle,
  getArticleComments,
  patchVoteCountArticle,
  patchVoteCountComment,
  postComment,
  getUsers,
  deleteComment,
  getTopics,
  getArticlesByTopic,
};
