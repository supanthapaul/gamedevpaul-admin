import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import {AuthProvider} from './Auth'
import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
