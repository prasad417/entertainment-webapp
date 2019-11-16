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
    const imageStyle = {
      width: '220px',
      height: '275px'
    };
    return (
      <div className="row">
        {this.state.failed === null && <p>Fetching Messages..</p>}
        {this.state.movies &&
          this.state.movies.map(
            movie =>  (
                <div key={movie.movieId} className="card text-center">
                    <div className="card-body">
                      <img src={`${config.resourceServer.imageUrl}${movie.movieImage}`} alt={movie.movieImage} class="mx-auto d-block" style={imageStyle}></img>
                     
                      <h4 className="card-title">{`Starring: ${movie.starring}`}</h4>
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