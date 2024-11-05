import axios from "axios";
const api = axios.create({
  baseURL: "https://nc-news-m2v4.onrender.com/api",
});

const getArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};

const getSingleArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export { getArticles, getSingleArticle };
