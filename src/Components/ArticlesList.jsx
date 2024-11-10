import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [allArticles, setAllArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  const sortByQuery = searchParams.get("sort_by" || "");
  const orderByQuery = searchParams.get("order" || "");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const sortBy = sort || sortByQuery;
    const orderBy = order || orderByQuery;
    getArticles({ sort_by: sortBy, order: orderBy })
      .then((articlesData) => {
        setAllArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
    const searchObject = {};
    if (sortBy) searchObject.sort_by = sortBy;
    if (orderBy) searchObject.order = orderBy;
    setSearchParams(searchObject);
  }, [sort, order, setSearchParams]);

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
          aria-label="Sort By"
          id="sort-select"
          className="filter-menu"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          <option value="">Sort By</option>
          <option value="created_at">Date</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
        </select>

        <select
          aria-label="Order By"
          id="order-select"
          className="filter-menu"
          value={order}
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        >
          <option value="">Order By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="article-container">
        {allArticles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
