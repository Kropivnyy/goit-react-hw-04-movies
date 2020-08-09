import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiServices from '../../Services/apiServices';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    apiServices.fetchTrendingMovies().then(trendingMovies => {
      this.setState({ movies: trendingMovies });
    });
  }

  render() {
    return (
      <>
        <h2>Trending Movies</h2>
        <ul>
          {this.state.movies.map(movie => (
            <li>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
