import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={EmployeeList} />
      </Switch>
    </Router>
  );
};

export default App;
