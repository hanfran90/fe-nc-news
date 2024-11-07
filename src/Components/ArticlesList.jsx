import { useState, useEffect } from "react";
import { getArticles } from "../api";
import Loading from "./Loading";
import Error from "./Error";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [allArticles, setAllArticles] = useState([]);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const sortBy = sort ? sort : undefined;
    const orderBy = order ? order : undefined;
    getArticles({ sort_by: sortBy, order: orderBy })
      .then((articlesData) => {
        setAllArticles(articlesData);
        console.log(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [sort, order]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h2>Enjoy reading todays news!</h2>
      <div>
        <select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          <option value="">All Articles</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="created_at">Date</option>
        </select>
        <select
          value={order}
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        >
          <option value=""></option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul>
        {allArticles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </ul>
    </section>
  );
}

export default ArticlesList;
