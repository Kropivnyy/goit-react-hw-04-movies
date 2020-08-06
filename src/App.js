import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MoviesPage from './Pages/MoviesPage';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/movies" component={MoviesPage} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
