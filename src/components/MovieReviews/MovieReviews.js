import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import ApiError from '../../components/ApiError';
import apiServices from '../../Services/apiServices';
import styles from './MovieReviews.module.css';

class MovieReviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { match } = this.props;

    apiServices
      .fetchMovieReview(match.params.movieId)
      .then(reviews => {
        this.setState({ reviews, error: null });
      })
      .catch(error => this.setState({ error: error.toString() }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { reviews, isLoading, error } = this.state;
    const shouldRenderFallback = reviews.length <= 0 && !isLoading && !error;
    const sectionClassNames = `${styles.MovieReviews} ContainerInner`;

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
        {reviews.length > 0 && (
          <ul className={styles.List}>
            {reviews.map(review => (
              <li className={styles.Item} key={review.id}>
                <h3 className={styles.Author}>Author: {review.author}</h3>
                <p className={styles.Content}>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
        {shouldRenderFallback && (
          <p className={styles.Content}>
            We don't have any reviews for this movie.
          </p>
        )}
        {error && <ApiError error={error} />}
      </section>
    );
  }
}

export default MovieReviews;
