import { Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import { useContext, useState, useEffect } from "react";
import { getTopics } from "../api";

function NavBar() {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [topic, setTopic] = useState([]);
  const [showDropdownTopic, setShowDropdownTopic] = useState(false);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopic(topics);
    });
  }, []);
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
        <Link to="/users">Login</Link>
        <section
          className="dropdown-topics"
          onMouseEnter={() => setShowDropdownTopic(true)}
          onMouseLeave={() => setShowDropdownTopic(false)}
        >
          <span className="dropdown-title">Topics</span>
          {showDropdownTopic && (
            <div className="dropdown-topic">
              {topic.length > 0 ? (
                topic.map((topic) => (
                  <Link
                    key={topic.slug}
                    to={`/topics/${topic.slug.toLowerCase()}`}
                  >
                    {topic.slug.toUpperCase()}
                  </Link>
                ))
              ) : (
                <p>No Topics available</p>
              )}
            </div>
          )}
        </section>
      </nav>
      <section>
        <h2> Welcome {isLoggedIn ? loggedInUser.username : "guest"} </h2>
      </section>
    </>
  );
}

export default NavBar;
