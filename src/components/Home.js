import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'
import { checkAuthentication } from '../helpers'

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {this.state.authenticated &&
            <div>
              <p>Welcome, {this.state.userinfo.name}!</p>
              <p>
                You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
                Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
              </p>
            </div>
          }
          {!this.state.authenticated &&
            <div>
              <h3><i>Welcome to Entertainment app. Please Login.</i></h3>
            </div>
          }

        </div>
        }
      </div>
    );
  }
});