import { useState } from "react";
import { postComment } from "../api";

function PostComment({ article_id, addNewComment }) {
  const [newComment, setNewComment] = useState({ body: "", username: "" });
  const [isPosting, setIsPosting] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newComment.body || !newComment.username) {
      setIsError("Please fill out both fields to post a comment!");
      return;
    }
    setIsPosting(true);
    setIsError(null);

    postComment(article_id, newComment)
      .then((commentData) => {
        addNewComment(commentData.comment);
        setNewComment({ body: "", username: "" });
        setIsPosting(false);
      })
      .catch((error) => {
        setIsPosting(false);
        setIsError("Failed to post comment. Please try again.");
      });
  };

  return (
    <>
      {isPosting && <p>Posting your comment...</p>}
      <form onSubmit={handleSubmit} method="post" className="post-form">
        <label id="comment-form">
          Comment:
          <input
            type="text"
            name="body"
            placeholder="Write your comment here..."
            value={newComment.body}
            onChange={handleChange}
          />
        </label>
        <br />
        <label id="username-form">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Valid username..."
            value={newComment.username}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={isPosting}>
          Post
        </button>
      </form>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
    </>
  );
}

export default PostComment;
