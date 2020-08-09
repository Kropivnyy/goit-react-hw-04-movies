import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import MovieCast from '../../components/MovieCast';
import MovieReviews from '../../components/MovieReviews';
import apiServices from '../../Services/apiServices';

class MovieDetailsPage extends Component {
  state = {
    release_date: null,
    genres: null,
    poster_path: null,
    title: null,
    vote_average: null,
    overview: null,
    releaseYear: null,
    mappedGenres: null,
    poster: null,
  };

  componentDidMount() {
    apiServices
      .fetchMovieById(this.props.match.params.movieId)
      .then(
        ({
          release_date,
          genres,
          poster_path,
          title,
          vote_average,
          overview,
        }) => {
          this.setState({
            release_date,
            genres,
            poster_path,
            title,
            vote_average,
            overview,
          });
        },
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { release_date, genres, poster_path } = this.state;
    if (release_date && prevState.release_date !== release_date) {
      this.setState({ releaseYear: release_date.slice(0, 4) });
    }

    if (genres && prevState.genres !== genres) {
      this.setState({
        mappedGenres: genres.map(genre => `${genre.name} `),
      });
    }

    if (poster_path && prevState.poster_path !== poster_path) {
      this.setState({
        poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
      });
    }
  }

  render() {
    const {
      poster,
      title,
      vote_average,
      overview,
      releaseYear,
      mappedGenres,
    } = this.state;

    return (
      <>
        <div>
          <ul>
            <li>
              <NavLink
                to={`${this.props.match.url}/cast`}
                className="nav-link"
                activeClassName="nav-link--active"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${this.props.match.url}/reviews`}
                className="nav-link"
                activeClassName="nav-link--active"
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Route path={`${this.props.match.path}/cast`} component={MovieCast} />
          <Route
            path={`${this.props.match.path}/reviews`}
            component={MovieReviews}
          />
        </div>
        <div>
          <img src={poster} alt={title}></img>
          <h2>
            {title} ({releaseYear})
          </h2>
          <p>User Score: {vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{mappedGenres}</p>
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
