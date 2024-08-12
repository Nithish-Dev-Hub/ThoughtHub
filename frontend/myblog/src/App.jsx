import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Authenticate from "./pages/Authenticate.jsx"
import Authorize from "./pages/Authorize.jsx"
import Home from "./pages/Home.jsx"
import Layout from "./pages/Layout.jsx"
import FourOfFour from "./pages/FourOfFour.jsx"
import WelcomePage from './pages/WelcomPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import CreatePost from "./pages/CreatePost.jsx";

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/home" element={<BlogPage/>} />
          <Route path="/login" element={<Authenticate/>} />
          <Route path="/register" element={<Authorize/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/dashboard" element={<Layout/>} />
          <Route path="*" element={<FourOfFour/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
