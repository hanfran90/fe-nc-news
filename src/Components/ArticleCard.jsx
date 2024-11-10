import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <section className="article-card">
      <img src={article.article_img_url} alt="" />
      <Link to={`/articles/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>
      <p>{article.author}</p>
    </section>
  );
}

export default ArticleCard;
