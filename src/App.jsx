import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./Context/User";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import SingleArticleCard from "./Components/SingleArticleCard";
import ArticleComments from "./Components/ArticleComments";
import ArticlesList from "./Components/ArticlesList";
import ArticlesByTopic from "./Components/ArticlesByTopic";
import UserList from "./Components/UserList";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = Object.keys(loggedInUser).length > 0;
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn }}>
      <>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route
            path="/articles/:article_id"
            element={
              <section>
                <SingleArticleCard />
                <ArticleComments />
              </section>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/topics/:topic" element={<ArticlesByTopic />} />

          <Route
            path="*"
            element={<p>Path does not exist! Please enter a valid path.</p>}
          />
        </Routes>
      </>
    </UserContext.Provider>
  );
}

export default App;
