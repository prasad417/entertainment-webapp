import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'

// import fetch from 'fetch'
import config from '../config'

export default withAuth(class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = { languages: null, failed: false };
  }

  componentDidMount() {
    this.getLanguages();
  }

  async getLanguages() {
    if (!this.state.languages) {
      try {
        const accessToken = `Bearer ${await this.props.auth.getAccessToken()}`;
        /* global fetch */
        const response = await fetch(config.resourceServer.languagesUrl, {
            headers: {
                'Authorization': accessToken,
            }
        });

        if (response.status !== 200) {
          this.setState({ failed: true });
          return;
        }

        const data = await response.json();
        this.setState({ languages: data, failed: false });
      } catch (err) {
        this.setState({ failed: true });
        console.error(err);
      }
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.failed === null && <p>Fetching Messages..</p>}
        {this.state.languages &&
          this.state.languages.map(
            language =>  (
                <div key={language.languageId} className="card text-center">
                    <div className="card-body">
                        <h4 className="card-title">{language.languageName}</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href={`/movies/${language.languageName.toLowerCase()}`} className="btn btn-danger">{language.languageName}</a>
                    </div>
                </div>         
            )
          )
        }
        </div>
    );
  }
});