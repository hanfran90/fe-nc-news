import Loading from "./Loading";
import CommentCard from "./CommentCard";

function ArticleComments({ allComments, showComments }) {
  if (!showComments) return null;

  if (!allComments) {
    return <Loading />;
  }

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
