import VotesCount from "./VotesCount";

function CommentCard({ comment }) {
  return (
    <section className="comment-card">
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <div>{<VotesCount />}</div>
      <p>{comment.created_at}</p>
      <button>Delete</button>
    </section>
  );
}

export default CommentCard;
