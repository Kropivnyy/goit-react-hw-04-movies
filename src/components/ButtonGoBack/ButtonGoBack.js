import React from 'react';
import routes from '../../Pages/routes';
import styles from './ButtonGoBack.module.css';

const ButtonGoBack = ({ location, history }) => {
  const handleGoBack = () => {
    if (location.state && location.state.from) {
      return history.push({
        pathname: location.state.from.pathname,
        search: location.state.from.search,
      });
    }

    history.push(routes.home);
  };

  return (
    <button
      className={styles.ButtonGoBack}
      type="button"
      onClick={handleGoBack}
    >
      Go Back
    </button>
  );
};

export default ButtonGoBack;
