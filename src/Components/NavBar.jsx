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
        <Link to="/">HOME</Link>
        <Link to="/users">LOGIN</Link>
        <section
          className="dropdown-topics"
          onMouseEnter={() => setShowDropdownTopic(true)}
          onMouseLeave={() => setShowDropdownTopic(false)}
        >
          <span className="dropdown-title">TOPICS</span>
          {showDropdownTopic && (
            <div className="dropdown-topic">
              {topic.length > 0 ? (
                topic.map((topic) => (
                  <ul key={topic.slug}>
                    <Link to={`/topics/${topic.slug.toLowerCase()}`}>
                      {topic.slug.toUpperCase()}
                    </Link>
                  </ul>
                ))
              ) : (
                <p>No Topics available</p>
              )}
            </div>
          )}
        </section>
      </nav>
      <section>
        <h2> Welcome {isLoggedIn ? loggedInUser.username : "Guest"} </h2>
      </section>
    </>
  );
}

export default NavBar;
