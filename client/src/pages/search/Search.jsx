import React, { useState } from 'react';

import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';

const mediaTypeOption = [
  { value: '', label: 'Media Type' },
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movie' },
  { value: 'tv', label: 'TV' },
  { value: 'person', label: 'Person' },
];
const languageOption = [
  { value: '', label: 'Language' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: 'Japan' },
  { value: 'ko', label: 'Korea' },
];

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [genre, setGenre] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');

  const [search, setSearch] = useState({
    keyword: '',
    genre: '',
    mediaType: '',
    language: '',
    year: '',
  });

  const handleSearch = () => {
    setSearch({
      keyword: keyword,
      genre: genre,
      mediaType: mediaType,
      language: language,
      year: year,
    });
  };

  const resetSearch = () => {
    setKeyword('');
    setGenre('');
    setMediaType('');
    setLanguage('');
    setYear('');
    setSearch({
      keyword: '',
      genre: '',
      mediaType: '',
      language: '',
      year: '',
    });
  };

  return (
    <div className='app'>
      <Nav />
      <div className='s009'>
        <form>
          <div className='inner-form'>
            <div className='basic-search'>
              <div className='input-field'>
                <input
                  type='text'
                  placeholder='Keywords'
                  onChange={e => setKeyword(e.target.value)}
                  value={keyword}
                />
                <input
                  type='text'
                  placeholder='Genres'
                  onChange={e => setGenre(e.target.value)}
                  value={genre}
                />
                <select onChange={e => setMediaType(e.target.value)}>
                  {mediaTypeOption.map(option => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <select onChange={e => setLanguage(e.target.value)}>
                  {languageOption.map(option => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <input
                  type='text'
                  placeholder='Years'
                  onChange={e => setYear(e.target.value)}
                  value={year}
                />
                <div className='icon-wrap'>
                  <svg
                    className='svg-inline--fa fa-search fa-w-16'
                    fill='#ccc'
                    aria-hidden='true'
                    data-prefix='fas'
                    data-icon='search'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className='advance-search'>
              <div className='row third'>
                <div className='input-field'>
                  <div className='result-count'></div>
                  <div className='group-btn'>
                    <button
                      className='btn-delete'
                      onClick={resetSearch}
                      type='reset'>
                      RESET
                    </button>
                    <button
                      className='btn-search'
                      onClick={() => handleSearch()}
                      type='button'>
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult search={search} />
    </div>
  );
};

export default Search;
