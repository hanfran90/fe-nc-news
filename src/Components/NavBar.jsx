import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav id="navbar">
      <Link to="/">Home</Link>
      <Link to="/articles?topic=:topic">Topics</Link>
      <Link to="/users">Profile</Link>
    </nav>
  );
}

export default NavBar;
