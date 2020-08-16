import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar';
import Loader from 'react-loader-spinner';
import routes from './Pages/routes';

const HomePage = lazy(() =>
  import('./Pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./Pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const App = () => (
  <>
    <AppBar />
    <Suspense
      fallback={
        <div className="LoaderWrapper">
          <Loader type="BallTriangle" color="#f5001d" height={80} width={80} />
        </div>
      }
    >
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
        <Redirect to={routes.home} />
      </Switch>
    </Suspense>
  </>
);

export default App;
