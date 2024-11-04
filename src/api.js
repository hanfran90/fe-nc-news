import axios from "axios";
const api = axios.create({
  baseURL: "https://nc-news-m2v4.onrender.com/api",
});

const getArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export { getArticles };
