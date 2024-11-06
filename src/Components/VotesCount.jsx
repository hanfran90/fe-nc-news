import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVoteCount } from "../api";

function VotesCount() {
  const { article_id } = useParams();
  const [voteCount, setVoteCount] = useState(0);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getVoteCount(article_id).then((voteCount) => {
      setVoteCount(voteCount);
    });
  }, []);

  const handleAddVote = () => {
    setIsError(null);
    setVoteCount((currentVoteCount) => currentVoteCount + 1);
    if (isError) {
      setVoteCount((currentVoteCount) => currentVoteCount - 1);
      setIsError("Your vote was not successful. Please try again!");
    }
  };

  const handleSubtractVote = () => {
    setVoteCount((currentVoteCount) => currentVoteCount - 1);
    if (isError) {
      setVoteCount((currentVoteCount) => currentVoteCount + 1);
      setIsError("Could not rescind your vote. Please try again!");
    }
  };

  return (
    <>
      <p>Votes: {voteCount}</p>
      <button onClick={handleAddVote}> +</button>
      {isError ? <p>{isError}</p> : null}
      <button onClick={handleSubtractVote}>-</button>
    </>
  );
}

export default VotesCount;
