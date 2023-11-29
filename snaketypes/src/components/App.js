import "../assets/css/App.css";
import Home from "./Home";
import Header from "./Header";
import Stage from "./Stage";
import Login from "./Login";
import Side from "./Side";
import MiniProfile from "./MiniProfile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Side />
        {/*<MiniProfile />*/}
        <Routes>
          {/* Home Page */}
          <Route exact path="/" Component={Home}></Route>
          {/* Stage */}
          <Route exact path="/stage" Component={Stage} />
          {/* Profile */}
          <Route exact path="/login" Component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
