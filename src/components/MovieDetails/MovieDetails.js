import React from 'react';
import Container from '../Container/Container';
import styles from './MovieDetails.module.css';

const MovieDetails = ({
  poster_path,
  poster,
  title,
  releaseYear,
  vote_average,
  overview,
  mappedGenres,
  children,
}) => {
  const sectionClassNames = `${styles.MovieDetails} ContainerInner`;

  return (
    <Container>
      <section className={sectionClassNames}>
        {poster_path && (
          <img className={styles.Image} src={poster} alt={title}></img>
        )}
        <div>
          <div className={styles.Header}>
            <h2 className={styles.Title}>
              {title} ({releaseYear})
            </h2>
            {children}
          </div>
          <p>User Score: {vote_average * 10}%</p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{mappedGenres}</p>
        </div>
      </section>
    </Container>
  );
};

export default MovieDetails;
