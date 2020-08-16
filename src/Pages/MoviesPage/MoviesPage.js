import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';
import MovieList from '../../components/MovieList';
import Loader from 'react-loader-spinner';
import ApiError from '../../components/ApiError';
import apiServices from '../../Services/apiServices';

class MoviesPage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      this.searchMovies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    if (prevProps.location !== location) {
      this.searchMovies();
    }
  }

  formSubmitHandler = query => {
    const { location, history } = this.props;

    location.search = `?query=${query}`;

    this.setState({ movies: [], error: null });

    if (location && location.search) {
      history.push({
        pathname: location.pathname,
        search: location.search,
      });
    }
  };

  searchMovies = () => {
    this.setState({ isLoading: true });
    const { location } = this.props;

    apiServices
      .searchMovies(location.search)
      .then(movies => {
        this.setState({ movies: movies, error: null });
      })
      .catch(error => this.setState({ error: error.toString() }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { movies, isLoading, error } = this.state;

    return (
      <div className="ContainerInner">
        <SearchForm onSubmit={this.formSubmitHandler} />
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

export default MoviesPage;
