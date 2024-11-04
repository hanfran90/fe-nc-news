function ArticleCard({ article }) {
  return (
    <section className = "article-card">
      <img src={article.article_img_url} alt="article image" />
      <h2>{article.title}</h2>
      <h3>{article.author}</h3>
    </section>
  );
}

export default ArticleCard;
