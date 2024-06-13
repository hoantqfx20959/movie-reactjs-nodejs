import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';

import axios from '../../utils/axios';
import requests from '../../utils/requests';
import MovieDetail from '../../components/browse/MovieDetail';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({ search }) => {
  const keyword = search.keyword;
  const genre = search.genre;
  const mediaType = search.mediaType;
  const language = search.language;
  const year = search.year;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const url = `${requests.fetchSearch}?keyword=${keyword}&genre=${genre}&media_type=${mediaType}&language=${language}&year=${year}&page=${page}`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMovies(request.data.results);
      setTotalPage(request.data.total_pages);
      return request;
    }

    if (
      keyword !== '' ||
      genre !== '' ||
      mediaType !== '' ||
      language !== '' ||
      year !== ''
    ) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [url, keyword, genre, mediaType, language, year]);

  movies.sort((a, b) => b.popularity - a.popularity);

  const handleClick = movie => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl('');
    } else {
      setSelectedMovie(movie);
      movieTrailer(movie?.title || '')
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch(error => console.log(error));
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextClick = data => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className='row'>
      <h2>Search Result</h2>
      <div className='row_posters search-resul-container sc2'>
        {movies.map(movie => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: '40px' }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
      {movies.length > 0 && (
        <div className='actionGroup'>
          <button className='button' onClick={handlePrevClick}>
            Prev
          </button>
          <p>{page}</p>
          <button className='button' onClick={handleNextClick}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
