import { getArticleComments } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import CommentCard from "./CommentCard";

function ArticleComments() {
  const { article_id } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticleComments(article_id)
      .then((commentData) => {
        setAllComments(commentData);
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

  if (allComments.length === 0)
    return <h4>This article has no comments... why don't you add one?</h4>;

  return (
    <section>
      <ul>
        {allComments.map((comment) => (
          <CommentCard comment={comment} key={comment.comment_id} />
        ))}
      </ul>
    </section>
  );
}

export default ArticleComments;
