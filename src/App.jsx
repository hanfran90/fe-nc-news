import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import SingleArticleCard from "./Components/SingleArticleCard";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<SingleArticleCard />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}

export default App;
