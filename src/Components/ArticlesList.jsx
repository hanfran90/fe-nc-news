import { useState, useEffect } from "react";
import { getArticles } from "../api";
import Loading from "./Loading";
import Error from "./Error";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [allArticles, setAllArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getArticles()
      .then((articlesData) => {
        setAllArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h2>Enjoy reading todays news!</h2>
      <ul>
        {allArticles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </ul>
    </section>
  );
}

export default ArticlesList;
