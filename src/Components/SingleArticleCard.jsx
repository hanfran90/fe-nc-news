import { getSingleArticle, getArticleComments } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import ArticleComments from "./ArticleComments";
import Loading from "./Loading";
import Error from "./Error";
import VotesCount from "./VotesCount";

function SingleArticleCard() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getSingleArticle(article_id)
      .then((articleData) => {
        setSingleArticle(articleData);
        return getArticleComments(article_id);
      })
      .then((commentData) => {
        setAllComments(commentData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleCommentToggle = () => {
    setShowComments((prevState) => !prevState);
  };

  const addNewComment = (newComment) => {
    setAllComments((prevComments) => [newComment, ...prevComments]);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <h2>Article</h2>
      <section id="single-article">
        <h3>Title: {singleArticle.title}</h3>
        <img src={singleArticle.article_img_url} alt="article image" />
        <p>{singleArticle.body}</p>
        <p>Comment Count: {singleArticle.comment_count}</p>
        <p>Created At: {singleArticle.created_at}</p>
        <h4>Author: {singleArticle.author}</h4>
        <div>
          <VotesCount article_id={article_id} />
        </div>
        <p>Topic: {singleArticle.topic}</p>
      </section>

      <button onClick={handleCommentToggle}>
        {showComments ? "Hide Comments" : "Show and Post Comments"}
      </button>

      {showComments && (
        <>
          <CommentAdder article_id={article_id} addNewComment={addNewComment} />
          <ArticleComments
            article_id={article_id}
            showComments={showComments}
            allComments={allComments}
          />
        </>
      )}
    </>
  );
}

export default SingleArticleCard;
