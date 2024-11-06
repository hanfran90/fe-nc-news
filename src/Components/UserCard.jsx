import { useContext, useState } from "react";
import { UserContext } from "../Context/User";

function UserCard({ user }) {
  const { setLoggedInUser } = useContext(UserContext);

  const handleLogin = () => {
    setLoggedInUser(user);
  };

  return (
    <section className="user-card">
      <h4>{user.username}</h4>
      <img src={user.avatar_url} className="user-img" />
      <button onClick={handleLogin}>Login</button>
    </section>
  );
}

export default UserCard;
