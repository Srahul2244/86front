import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostAnalytics from "./components/PostAnalytics";
import Postform from "./components/Postform";
import UserAnalytics from "./components/UserAnalytics";
import Userform from "./components/Userform";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">User Create</Link>
          </li>
          <li>
            <Link to="/createpost"> Post Create</Link>
          </li>
          <li>
            <Link to="/userAnalytics">User Analytics</Link>
          </li>
          <li>
            <Link to="/postAnalytics">Post Analytics</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Userform />} />
        <Route path="/createpost" element={<Postform />} />
        <Route path="/userAnalytics" element={<UserAnalytics />} />
        <Route path="/postAnalytics" element={<PostAnalytics />} />
      </Routes>
    </div>
  );
}

export default App;
