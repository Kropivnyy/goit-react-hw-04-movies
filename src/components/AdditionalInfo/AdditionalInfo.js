import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import MovieCast from '../MovieCast';
import MovieReviews from '../MovieReviews';
import routes from '../../Pages/routes';

const AdditionalInfo = ({ match }) => {
  return (
    <>
      <Route path={`${match.path}${routes.cast}`} component={MovieCast} />
      <Route path={`${match.path}${routes.reviews}`} component={MovieReviews} />
    </>
  );
};

export default withRouter(AdditionalInfo);
