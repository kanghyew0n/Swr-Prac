import "./App.css";
import { Nav } from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Post from "./pages/Post";
import Optimistic from "./pages/Optimistic";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/post" element={<Post />} />
          <Route path="/optimistic" element={<Optimistic />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
