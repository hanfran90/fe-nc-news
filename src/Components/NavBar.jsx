import { Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import { useContext, useState } from "react";

function NavBar() {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
        <Link to="/articles?topic=:topic">Topics</Link>
        <Link to="/users">Login</Link>
      </nav>
      <section>
        <h4> Welcome {isLoggedIn ? loggedInUser.username : "guest"} </h4>
      </section>
    </>
  );
}

export default NavBar;
