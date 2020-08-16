import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from '../../Pages/routes';
import styles from './MovieList.module.css';

const MovieList = ({ movies, location }) => {
  return (
    <ul className={styles.MovieList}>
      {movies.map(movie => (
        <li className={styles.Item} key={movie.id}>
          <Link
            to={{
              pathname: `${routes.movies}/${movie.id}`,
              state: {
                from: location,
              },
            }}
            className={styles.Link}
          >
            {movie.poster_path && (
              <img
                className={styles.Image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              ></img>
            )}
            <p className={styles.Title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(MovieList);
