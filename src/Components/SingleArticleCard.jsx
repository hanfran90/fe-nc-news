import { getSingleArticle, getArticleComments, deleteComment } from "../api";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/User";
import CommentAdder from "./CommentAdder";
import ArticleComments from "./ArticleComments";
import Loading from "./Loading";
import Error from "./Error";
import VotesCount from "./VotesCount";

function SingleArticleCard() {
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);

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
        setIsError("Article does not exist...");
        setIsLoading(false);
      });
  }, [article_id]);

  const handleCommentToggle = () => {
    setShowComments((prevState) => !prevState);
  };

  const addNewComment = (newComment) => {
    setAllComments((prevComments) => [newComment, ...prevComments]);
  };

  const deleteUserComment = (commentId) => {
    setIsDeleting(commentId);
    deleteComment(commentId)
      .then(() => {
        setAllComments((prevComments) => {
          return prevComments.filter(
            (comment) => comment.comment_id !== commentId
          );
        });
        setDeleteSuccess("Comment was successfully deleted.");
        setTimeout(() => {
          setDeleteSuccess("");
        }, 3000);
      })
      .finally(() => {
        setIsDeleting(null);
      });
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;

  return (
    <>
      <section className= "single-article-card">
      <h2>{singleArticle.title}</h2>
        <img src={singleArticle.article_img_url} alt="article image" />
        <p>{singleArticle.body}</p>
        <p>Comment Count: {singleArticle.comment_count}</p>
        <p>Created At: {singleArticle.created_at}</p>
        <p>Author: {singleArticle.author}</p>
        <div>
          <VotesCount itemType="article" itemId={singleArticle.article_id} votes={singleArticle.votes} />
        </div>
        <p>Topic: {singleArticle.topic}</p>
      </section>

      <button onClick={handleCommentToggle}>
        {showComments ? "Hide Comments" : "Show and Post Comments"}
      </button>

      {deleteSuccess && <p>{deleteSuccess}</p>}

      {showComments && (
        <>
          <CommentAdder article_id={article_id} addNewComment={addNewComment} />
          <ArticleComments
            itemId={article_id}
            showComments={showComments}
            allComments={allComments}
            deleteUserComment={deleteUserComment}
            loggedInUser={loggedInUser}
            isDeleting={isDeleting}
          />
        </>
      )}
    </>
  );
}

export default SingleArticleCard;
