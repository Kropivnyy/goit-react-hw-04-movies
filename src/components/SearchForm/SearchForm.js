import React, { Component } from 'react';
import styles from './SearchForm.module.css';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  changeHandler = e => {
    this.setState({ query: e.currentTarget.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query) {
      this.props.onSubmit(query);

      this.setState({ query: '' });
    }
  };

  render() {
    const { query } = this.state;
    return (
      <form className={styles.SearchForm} onSubmit={this.submitHandler}>
        <input
          className={styles.Input}
          type="text"
          value={query}
          placeholder="Search Movie"
          autoFocus
          onChange={this.changeHandler}
        ></input>
        <button className={styles.Button} type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
