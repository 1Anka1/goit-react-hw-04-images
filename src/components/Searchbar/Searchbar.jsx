import React, { Component } from 'react';
import {toast}  from 'react-toastify';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };
  handelNameChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };
  handelSubmit = e => {
      e.preventDefault();
      if (this.state.search.trim() === '') {
        return toast.error('Please enter a picture name!');
      }
    this.props.onSubmit(this.state.search)
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    const { handelSubmit, handelNameChange } = this;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handelSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            onChange={handelNameChange}
            value={search}
            name = "search"
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
