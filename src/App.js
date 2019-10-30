import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import Config from './config'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Languages from './components/Languages'

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Security {...Config.oidc} onAuthRequired={customAuthHandler}>
            <Navbar />
            <Route path='/' exact component={Home} />
            <Route path='/implicit/callback' component={ImplicitCallback}/>
            <Route path="/login" component={Login} />
            <SecureRoute path="/profile" component={Profile} />
            <SecureRoute path="/movies" component={Languages} />
            <SecureRoute path="/music" component={Languages} />
            <SecureRoute path="/videos" component={Languages} />
          </Security>
        </Router>
      </div>
    )
  }
}

export default App
