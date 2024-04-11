import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import MovieShow from "./pages/MovieShow/MovieShow";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
function App() {
    const [searchValue, setSearchValue] = useState('')

  return (
      <Router>
          <Navbar setSearchValue={setSearchValue} />
          <div className="App">
              <Routes>
                  <Route path="/" element={<Home searchValue={searchValue} />} />
                  <Route path="/movie/:id" element={<MovieShow />} />
              </Routes>
          </div>
          <Footer />
      </Router>
  );
}

export default App;
