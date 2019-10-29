import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'

// import fetch from 'fetch'
import config from '../config'

export default withAuth(class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = { languages: null, failed: null };
  }

  componentDidMount() {
    this.getLanguages();
  }

  async getLanguages() {
    if (!this.state.languages) {
      try {
        const accessToken = `Bearer ${await this.props.auth.getAccessToken()}`;
        console.log(accessToken)
        /* global fetch */
        const response = await fetch(config.resourceServer.languagesUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                // 'Origin': 'http://localhost:3000',
                'Authorization': accessToken,
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json'
                
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Expose-Headers": "Content-Length, X-JSON",
                // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                // "Access-Control-Allow-Headers": "*"
            },
        });

        if (response.status !== 200) {
          this.setState({ failed: true });
          return;
        }

        let index = 0;
        const data = await response.json();
        const messages = data.messages.map((message) => {
          const date = new Date(message.date);
          const day = date.toLocaleDateString();
          const time = date.toLocaleTimeString();
          index += 1;
          return {
            date: `${day} ${time}`,
            text: message.text,
            id: `message-${index}`,
          };
        });
        this.setState({ messages, failed: false });
      } catch (err) {
        this.setState({ failed: true });
        /* eslint-disable no-console */
        console.error(err);
      }
    }
  }

  render() {
    return (
      <div>
        <h1>My Languages Component</h1>
        }
      </div>
    );
  }
});