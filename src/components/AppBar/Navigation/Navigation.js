import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../../Container/Container';
import routes from '../../../Pages/routes';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navClassNames = `${styles.Navigation} ContainerInner`;

  return (
    <Container>
      <nav className={navClassNames}>
        <ul className={styles.List}>
          <li className={styles.Item}>
            <NavLink
              exact
              to={routes.home}
              className={styles.Link}
              activeClassName={styles.LinkActive}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.Item}>
            <NavLink
              exact
              to={routes.movies}
              className={styles.Link}
              activeClassName={styles.LinkActive}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Navigation;
