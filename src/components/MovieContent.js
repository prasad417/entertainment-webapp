import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'

// import fetch from 'fetch'
import config from '../config'

export default withAuth(class MovieContent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.languageName);
    this.state = { movies: null, failed: false };
  }

  componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    if (!this.state.movies) {
      try {
        const accessToken = `Bearer ${await this.props.auth.getAccessToken()}`;
        const movieApiUrl = `${config.resourceServer.moviesUrl}/${this.props.match.params.languageName}`
        /* global fetch */
        const response = await fetch(movieApiUrl, {
            headers: {
                'Authorization': accessToken,
            }
        });

        if (response.status !== 200) {
          this.setState({ failed: true });
          return;
        }

        const data = await response.json();
        this.setState({ movies: data, failed: false });
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
        {this.state.movies &&
          this.state.movies.map(
            movie =>  (
                <div key={movie.movieId} className="card text-center">
                    <div className="card-body">
                        <h4 className="card-title">{movie.movieName}</h4>
                        <p className="card-text">{`Starring: ${movie.starring}`}</p>
                        <a href={`/movies/${this.props.match.params.languageName}/${movie.movieName.toLowerCase()}`} className="btn btn-danger">{movie.movieName}</a>
                    </div>
                </div>         
            )
          )
        }
        </div>
    );
  }
});