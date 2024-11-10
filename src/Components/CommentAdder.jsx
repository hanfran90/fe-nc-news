import { useState } from "react";
import { postComment } from "../api";
import { UserContext } from "../Context/User";
import { useContext } from "react";

function PostComment({ article_id, addNewComment }) {
  const [newComment, setNewComment] = useState({ body: "" });
  const [isPosting, setIsPosting] = useState(false);
  const [isError, setIsError] = useState(null);
  const { loggedInUser } = useContext(UserContext);

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loggedInUser.username) {
      setIsError(
        "You must be logged in to post a comment. Please go to the Login page."
      );
      return;
    }
    if (!newComment.body) {
      setIsError("Please enter a comment before posting!");
      return;
    }
    setIsPosting(true);
    setIsError(null);

    postComment(article_id, { ...newComment, username: loggedInUser.username })
      .then((commentData) => {
        addNewComment(commentData.comment);
        setNewComment({ body: "" });
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
          <h3>Comment</h3>
          <textarea
            id="body"
            name="body"
            placeholder="Write your comment here..."
            value={newComment.body}
            onChange={handleChange}
            rows="4"
            aria-label="comment box"
          />
        </label>
        {loggedInUser.username ? (
          <p>Logged in: {loggedInUser.username}</p>
        ) : (
          <p> Please log in to post a comment</p>
        )}

        <button type="submit" disabled={isPosting}>
          Post
        </button>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
      </form>
    </>
  );
}

export default PostComment;
