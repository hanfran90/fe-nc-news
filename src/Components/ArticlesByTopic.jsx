import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticlesByTopic } from "../api";
import { Link } from "react-router-dom";

function ArticlesByTopic() {
  const [articleTopics, setArticleTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic).then((foundArticles) => {
      console.log(foundArticles);
      setArticleTopics(foundArticles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <section>
      <h3>Articles about {topic.toUpperCase()}</h3>
      {articleTopics.length > 0 ? (
        articleTopics.map((article) => (
          <div className="article-card" key={article.article_id}>
            <img src={article.article_img_url} />
            <Link to={`/articles/${article.article_id}`}>
              <h3>{article.title}</h3>
            </Link>
            <p>{article.author}</p>
          </div>
        ))
      ) : (
        <p>No articles available for this topic!</p>
      )}
    </section>
  );
}
export default ArticlesByTopic;
