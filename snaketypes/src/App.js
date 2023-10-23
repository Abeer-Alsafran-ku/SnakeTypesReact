import './App.css';
import Nav from './Nav';
import Header from './Header';
import Stage from './Stage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header/>

        <Routes>
          {/* Home Page */}
          <Route exact path="/" Component={Nav}></Route>
          {/* Stage */}
          <Route exact path="/stage" Component={Stage} />          
        </Routes>

      </div>
    </Router>
  );
}

export default App;
