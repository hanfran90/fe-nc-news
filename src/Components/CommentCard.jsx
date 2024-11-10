import VotesCount from "./VotesCount";
import { UserContext } from "../Context/User";
import { useContext } from "react";

function CommentCard({ comment, deleteUserComment, isDeleting }) {
  const { loggedInUser } = useContext(UserContext);

  const handleDelete = () => {
    deleteUserComment(comment.comment_id);
  };
  return (
    <section className="comment-card">
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <div>
        <VotesCount
          votes={comment.votes}
          itemId={comment.comment_id}
          itemType="comment"
        />
      </div>
      <p>
        {" "}
        {new Date(comment.created_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      {isDeleting === comment.comment_id ? (
        <p>Deleting...</p>
      ) : (
        loggedInUser.username === comment.author && (
          <button id= "delete-button" onClick={handleDelete}>Delete</button>
        )
      )}
    </section>
  );
}

export default CommentCard;
