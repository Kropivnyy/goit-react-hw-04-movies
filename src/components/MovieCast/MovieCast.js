import React, { Component } from 'react';
import apiServices from '../../Services/apiServices';

class MovieCast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    apiServices.fetchMovieCast(this.props.match.params.movieId).then(cast => {
      this.setState({ cast });
    });
  }

  render() {
    return (
      <>
        <ul>
          {this.state.cast.map(actor => (
            <li key={actor.cast_id}>
              <img
                src={
                  actor.profile_path &&
                  `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                }
                alt={actor.name}
              ></img>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MovieCast;
