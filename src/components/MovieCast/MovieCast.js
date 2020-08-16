import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import ApiError from '../../components/ApiError';
import apiServices from '../../Services/apiServices';
import styles from './MovieCast.module.css';

class MovieCast extends Component {
  state = {
    cast: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { match } = this.props;

    apiServices
      .fetchMovieCast(match.params.movieId)
      .then(cast => {
        this.setState({ cast, error: null });
      })
      .catch(error => this.setState({ error: error.toString() }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { cast, isLoading, error } = this.state;
    const shouldRenderFallback = cast.length <= 0 && !isLoading && !error;
    const sectionClassNames = `${styles.MovieCast} ContainerInner`;

    return (
      <section className={sectionClassNames}>
        <div className="LoaderWrapper">
          <Loader
            visible={isLoading}
            type="BallTriangle"
            color="#f5001d"
            height={80}
            width={80}
          />
        </div>
        {cast.length > 0 && (
          <ul className={styles.List}>
            {cast.map(actor => (
              <li className={styles.Item} key={actor.cast_id}>
                <div className={styles.ItemInfoWrapper}>
                  {actor.profile_path && (
                    <img
                      className={styles.Image}
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                    ></img>
                  )}
                  <div className={styles.Text}>
                    <h4>{actor.name}</h4>
                    <p>Character: {actor.character}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {shouldRenderFallback && (
          <p className={styles.Fallback}>
            We don't have information about the actors from this movie.
          </p>
        )}

        {error && <ApiError error={error} />}
      </section>
    );
  }
}

export default MovieCast;
