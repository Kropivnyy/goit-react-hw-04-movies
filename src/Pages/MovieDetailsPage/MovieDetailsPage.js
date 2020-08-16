import React, { Component } from 'react';
import MovieDetails from '../../components/MovieDetails';
import NavAdditionalInfo from '../../components/NavAdditionalInfo';
import AdditionalInfo from '../../components/AdditionalInfo';
import ButtonGoBack from '../../components/ButtonGoBack';
import Loader from 'react-loader-spinner';
import ApiError from '../../components/ApiError';
import apiServices from '../../Services/apiServices';

class MovieDetailsPage extends Component {
  state = {
    release_date: '',
    genres: '',
    poster_path: '',
    title: '',
    vote_average: '',
    overview: '',
    releaseYear: '',
    mappedGenres: '',
    poster: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ isLoading: true });

    apiServices
      .fetchMovieById(match.params.movieId)
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
            error: null,
          });
        },
      )
      .catch(error => this.setState({ error: error.toString() }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { release_date, genres, poster_path } = this.state;
    if (release_date && prevState.release_date !== release_date) {
      this.setState({ releaseYear: release_date.slice(0, 4) });
    }

    if (genres && prevState.genres !== genres) {
      this.setState({
        mappedGenres: genres.map((genre, index, array) => {
          if (index === array.length - 1) return genre.name;

          return `${genre.name}, `;
        }),
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
      poster_path,
      title,
      vote_average,
      overview,
      releaseYear,
      mappedGenres,
      isLoading,
      error,
    } = this.state;

    const { location, history } = this.props;

    const shouldRenderFallback = title.length <= 0 && !error && !isLoading;

    return (
      <>
        <div className="LoaderWrapper">
          <Loader
            visible={isLoading}
            type="BallTriangle"
            color="#f5001d"
            height={80}
            width={80}
          />
        </div>
        {title.length > 0 && (
          <>
            <MovieDetails
              poster_path={poster_path}
              poster={poster}
              title={title}
              releaseYear={releaseYear}
              vote_average={vote_average}
              overview={overview}
              mappedGenres={mappedGenres}
            >
              <ButtonGoBack location={location} history={history} />
            </MovieDetails>
            <NavAdditionalInfo />
            <AdditionalInfo />
          </>
        )}
        {shouldRenderFallback && (
          <p>We don't have information about this movie.</p>
        )}
        {error && <ApiError error={error} />}
      </>
    );
  }
}

export default MovieDetailsPage;
