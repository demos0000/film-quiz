import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Layout from './components/Layout'

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/quiz"><Quiz /></Route>
            <Route path="/layout"><Layout /></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
