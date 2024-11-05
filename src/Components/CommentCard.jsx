function CommentCard({ comment }) {
  return (
    <section className="comment-card">
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <p>{comment.votes}</p>
      <p>{comment.created_at}</p>
    </section>
  );
}

export default CommentCard;
