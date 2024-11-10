import { useState, useEffect } from "react";
import { patchVoteCountComment, patchVoteCountArticle } from "../api";

function VotesCount({ votes, itemId, itemType }) {
  const [voteCount, setVoteCount] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(votes);
  }, [votes]);

  const handleVote = (increment) => {
    setIsError(null);
    setVoteCount((prevVoteCount) => {
      return prevVoteCount + increment;
    });
    setIsLoading(true);

    let patchVote;
    if (itemType === "article") {
      patchVote = patchVoteCountArticle;
    } else if (itemType === "comment") {
      patchVote = patchVoteCountComment;
    } else {
      setIsError("An error occured whilst voting. Please try again");
      return;
    }

    patchVote(itemId, increment)
      .then(() => {
        console.log(itemId);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      {isError ? <p>{isError}</p> : null}
      <button onClick={() => handleVote(-1)} disabled={isLoading}>
        -
      </button>
    </>
  );
}

export default VotesCount;
