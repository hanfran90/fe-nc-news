import { useState, useEffect } from "react";
import { patchVoteCountComment, patchVoteCountArticle } from "../api";
import { UserContext } from "../Context/User";
import { useContext } from "react";

function VotesCount({ votes, itemId, itemType }) {
  const { loggedInUser } = useContext(UserContext);
  const [voteCount, setVoteCount] = useState(votes);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(votes);
  }, [votes]);

  const handleVote = (increment) => {
    if (!loggedInUser.username) {
      setIsError("You must be logged in to vote. Please go to the Login page.");
      return;
    }

    setIsError("");
    setIsLoading(true);
    setVoteCount((prevVoteCount) => prevVoteCount + increment);

    let patchVote;
    if (itemType === "article") {
      patchVote = patchVoteCountArticle;
    } else if (itemType === "comment") {
      patchVote = patchVoteCountComment;
    } else {
      setIsError("An error occurred while voting. Please try again.");
      setIsLoading(false);
      return;
    }

    patchVote(itemId, increment)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setVoteCount((prevVoteCount) => prevVoteCount - increment);
        setIsError("Your vote was not successful. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <>
      <p>Votes: {voteCount}</p>
      <button onClick={() => handleVote(1)} disabled={isLoading}>
        +
      </button>
      <button onClick={() => handleVote(-1)} disabled={isLoading}>
        -
      </button>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
    </>
  );
}

export default VotesCount;
