import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import Config from './config'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'

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
          </Security>
        </Router>
      </div>
    )
  }
}

export default App
