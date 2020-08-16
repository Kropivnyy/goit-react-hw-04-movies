import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Container from '../Container/Container';
import routes from '../../Pages/routes';
import styles from './NavAdditionalInfo.module.css';

const NavAdditionalInfo = ({ match }) => {
  return (
    <Container>
      <section className="ContainerInner">
        <p className={styles.Title}>Additional information</p>
        <ul className={styles.List}>
          <li className={styles.Item}>
            <NavLink
              to={`${match.url}${routes.cast}`}
              className={styles.Link}
              activeClassName={styles.LinkActive}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${match.url}${routes.reviews}`}
              className={styles.Link}
              activeClassName={styles.LinkActive}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </section>
    </Container>
  );
};

export default withRouter(NavAdditionalInfo);
