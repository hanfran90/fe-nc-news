import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <section className="article-card">
      <img src={article.article_img_url} alt={article.title} />
      <div className="content">
        <Link to={`/articles/${article.article_id}`}>
          <h3 className="title">{article.title}</h3>
        </Link>
        <p className="author">{article.author}</p>
        <p className="created-at">
          {new Date(article.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </section>
  );
}

export default ArticleCard;

