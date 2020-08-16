import React, { Component } from 'react';
import MovieList from '../../components/MovieList';
import Loader from 'react-loader-spinner';
import ApiError from '../../components/ApiError';
import apiServices from '../../Services/apiServices';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    apiServices
      .fetchTrendingMovies()
      .then(trendingMovies => {
        this.setState({ movies: trendingMovies, error: null });
      })
      .catch(error => this.setState({ error: error.toString() }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { movies, isLoading, error } = this.state;

    return (
      <div className="ContainerInner">
        <h2 className={styles.Title}>Trending Movies</h2>
        <div className="LoaderWrapper">
          <Loader
            visible={isLoading}
            type="BallTriangle"
            color="#f5001d"
            height={80}
            width={80}
          />
        </div>
        {movies.length > 0 && <MovieList movies={movies} />}
        {error && <ApiError error={error} />}
      </div>
    );
  }
}

export default HomePage;
