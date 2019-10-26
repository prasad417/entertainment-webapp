import React, { Component } from 'react'
import Logo from "../images/music.svg"
import { withAuth } from '@okta/okta-react'
import { checkAuthentication } from '../helpers'

export default withAuth(class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = checkAuthentication.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
    
      async logout() {
        this.props.auth.logout('/');
      }

    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg bg-danger">
                <div className="container">
                    <div className="navbar-translate">
                        <a className="navbar-brand" href="/">
                            <img src={Logo} width="60" height="40" className="d-inline-block align-top" alt="Logo" />
                            <b><i>Entertainment App</i></b>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {this.state.authenticated === true &&
                            <li className="nav-item">
                                <a className="nav-link" href="/movies">
                                    <i className="material-icons">
                                        movie
                                    </i>
                                    Movies 
                                </a>
                            </li>
                            }
                            {this.state.authenticated === true &&
                            <li className="nav-item">
                                <a className="nav-link" href="/music">
                                    <i className="material-icons">
                                        library_music
                                    </i>
                                    Music
                                </a>
                            </li>
                            }
                            {this.state.authenticated === true &&
                            <li className="nav-item">
                                <a className="nav-link" href="/videos">
                                    <i className="material-icons">
                                        video_library
                                    </i>
                                    Videos
                                </a>
                            </li>
                            }
                            {this.state.authenticated === false &&
                                <button onClick={this.login} className="btn btn-danger btn-round btn-small"><i className="material-icons">account_circle</i>  Register / Log In</button>
                            }
                            {this.state.authenticated === true &&
                                <button onClick={this.logout} className="btn btn-danger btn-round btn-small"><i className="material-icons">emoji_people</i>  Logout</button>
                            }
                        </ul>
                        {this.state.authenticated === true &&
                        <form className="form-inline ml-auto">
                            <div className="form-group has-white">
                                <input type="text" className="form-control" placeholder="Search Movies" />
                            </div>
                            <button type="submit" className="btn btn-white btn-just-icon btn-round">
                                <i className="material-icons">search</i>
                            </button>
                        </form>
                        }
                    </div>
                </div>
            </nav>
            /* dark, success, danger, warning, white, primary, info
             <nav className="navbar navbar-expand-lg bg-info">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} width="60" height="40" className="d-inline-block align-top" alt="Logo" />
                        <b><i>Entertainment App</i></b>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                {/* <span className="sr-only">(current)</span> 
                                <a className="nav-link" href="/">
                                    <i className="material-icons">
                                        movie
                                    </i>
                                    Movies 
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="material-icons">
                                        library_music
                                    </i>
                                    Music
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="material-icons">
                                        video_library
                                    </i>
                                    Videos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="material-icons">
                                        account_circle
                                    </i>
                                    User
                                </a>
                            </li>
                        </ul>
                        <form className="form-inline ml-auto">
                            <div className="form-group has-white">
                                <input type="text" className="form-control" placeholder="Search Movies" />
                            </div>
                            <button type="submit" className="btn btn-white btn-just-icon btn-round">
                                <i className="material-icons">search</i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav> */
        )
    }
})