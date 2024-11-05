import { getSingleArticle } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

function SingleArticleCard() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getSingleArticle(article_id)
      .then((articleData) => {
        setSingleArticle(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <h2>Article</h2>
      <section id="single-article">
        <h3>Title:{singleArticle.title}</h3>
        <img src={singleArticle.article_img_url} alt="article image" />
        <p>{singleArticle.body}</p>
        <p>Comment Count:{singleArticle.comment_count}</p>
        <p>Created At:{singleArticle.created_at}</p>
        <h4>Author:{singleArticle.author}</h4>
        <p>Votes:{singleArticle.votes}</p>
        <p>Topic:{singleArticle.topic}</p>
        <button>Comment</button>
      </section>
    </>
  );
}
export default SingleArticleCard;
