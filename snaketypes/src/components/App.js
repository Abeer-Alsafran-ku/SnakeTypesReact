import '../assets/css/App.css';
import Home from './Home';
import Header from './Header';
import Stage from './Stage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Side from './Side';
// import { useState } from 'react';

function App() {

  return (
    <Router>
      <div className='App'>
        <Header/>
        <Side />

        <Routes>
          {/* Home Page */}
          <Route exact path="/" Component={Home}></Route>
          {/* Stage */}
          <Route exact path="/stage" Component={Stage} />          
        </Routes>

      </div>
    </Router>
  );
}

export default App;