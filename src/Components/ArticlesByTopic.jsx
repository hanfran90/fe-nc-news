import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticlesByTopic } from "../api";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

function ArticlesByTopic() {
  const [articleTopics, setArticleTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic)
      .then((foundArticles) => {
        if (foundArticles.length === 0) {
          setIsError(true);
        } else {
          setArticleTopics(foundArticles);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Error msg="Could not find articles related to an non-existent topic." />
    );

  return (
    <>
      <h3>Articles about {topic.toUpperCase()}</h3>
      <section className="article-container">
        {articleTopics.length > 0 ? (
          articleTopics.map((article) => (
            <div className="article-card" key={article.article_id}>
              <img src={article.article_img_url} alt={article.title} />
              <div className="article-content">
                <Link to={`/articles/${article.article_id}`}>
                  <h3 className="title">{article.title}</h3>
                </Link>
                <p className="author">{article.author}</p>
                <p className ="created-at">
                  {new Date(article.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available for this topic!</p>
        )}
      </section>
    </>
  );
}
export default ArticlesByTopic;
