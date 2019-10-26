import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import Config from './config'
import Navbar from './components/Navbar'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Security {...Config.oidc}>
            <Navbar />
            <Route path='/' exact component={Home} />
            <Route path='/implicit/callback' component={ImplicitCallback}/>
          </Security>
        </Router>
      </div>
    )
  }
}

export default App
