import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVoteCount, patchVoteCountArticle } from "../api";
import { UserContext } from "../Context/User";
import Loading from "./Loading";

function VotesCount() {
  const { article_id } = useParams();
  const [voteCount, setVoteCount] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getVoteCount(article_id).then((voteCount) => {
      setVoteCount(voteCount);
    });
  }, [article_id]);

  const handleAddVote = () => {
    setIsError(null);
    setVoteCount((voteCount) => voteCount + 1);
    setIsLoading(true);
    patchVoteCountArticle(article_id, 1)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setVoteCount((voteCount) => voteCount - 1);
        setIsError("Your vote was not successful. Please try again!");
      });
  };

  const handleSubtractVote = () => {
    setVoteCount((voteCount) => voteCount - 1);
    setIsLoading(true);
    patchVoteCountArticle(article_id, -1)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setVoteCount((voteCount) => voteCount + 1);
        setIsError("Could not rescind your vote. Please try again!");
      });
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
