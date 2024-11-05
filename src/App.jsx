import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import SingleArticleCard from "./Components/SingleArticleCard";
import ArticleComments from "./Components/ArticleComments";
import CommentCard from "./Components/CommentCard";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/articles/:article_id"
          element={
            <section>
              <SingleArticleCard />
              <ArticleComments />
            </section>
          }
        />

        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}

export default App;
