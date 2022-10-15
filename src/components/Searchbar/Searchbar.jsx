import { useState } from 'react';import { toast } from 'react-toastify';
import css from './Searchbar.module.css';


export default function Searchbar({onSubmit}) {
  const [search, setSearch] = useState('')

 const handelNameChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
 };
  
  const handelSubmit = e => {
    e.preventDefault();
      if (search.trim() === '') {
        return toast.error('Please enter a picture name!');
      }
    onSubmit (search) 
    setSearch('')
  };

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
};