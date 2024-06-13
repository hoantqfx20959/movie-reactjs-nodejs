const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Video = require('../models/video');
const paginate = require('../utils/paging');

const PAGE_SIZE = 10;

// lấy dữ liệu theo loại
exports.getTv = (req, res, next) => {
  const movies = Movie.fetchAll();

  const results = movies.filter(item => item.media_type === 'tv');

  return res.status(200).json({ results });
};

// lấy dữ liệu theo loại
exports.getTrending = (req, res, next) => {
  const page = req.query.page || 1;

  return res.status(200).json(fetchedMovies(page, 'popularity'));
};

// lấy dữ liệu theo loại
exports.getTopRate = (req, res, next) => {
  const page = req.query.page || 1;

  return res.status(200).json(fetchedMovies(page, 'vote_average'));
};

// lấy dữ liệu theo loại
exports.getDiscover = (req, res, next) => {
  const page = req.query.page || 1;
  const genre = req.query.genre;

  if (!genre) {
    return res.status(400).json({ message: 'Not found gerne parram' });
  }

  const genres = Genre.fetchAll();
  const genreHandler = genres.find(
    item => item.name.toLowerCase() === genre.toLowerCase()
  );
  if (!genreHandler) {
    return res.status(400).json({ message: 'Not found that genre id' });
  }

  const genre_ids = genreHandler.id;

  const movies = Movie.fetchAll();

  const filterMovies = movies.filter(item =>
    item.genre_ids.includes(+genre_ids)
  );

  const { results, total_pages } = resultsHandler(filterMovies, page);

  return res
    .status(200)
    .json({ results, page, total_pages, genre_name: genreHandler.name });
};

// lấy trailer
exports.postVideo = (req, res, next) => {
  const filmId = req.body.film_id;

  if (!filmId) {
    return res.status(400).json({ message: 'Not found film_id parram' });
  }

  const videos = Video.fetchAll();
  const movieHandler = videos.find(item => item.id === +filmId);
  if (!movieHandler) {
    return res.status(400).json({ message: 'Not found video' });
  }

  const results = movieHandler.videos
    .filter(item => item.official)
    .filter(item => item.site === 'YouTube')
    .filter(item => ['Trailer', 'Teaser'].includes(item.type))
    .sort((a, b) => {
      if (a.published_at > b.published_at) return -1;
      if (a.published_at < b.published_at) return 1;
      return 0;
    })
    .sort((a, b) => {
      if (a.type > b.type) return -1;
      if (a.type < b.type) return 1;
      return 0;
    });

  if (fetchedMovies.length === 0) {
    return res.status(400).json({ message: 'Not found video' });
  }

  return res.status(200).json({ results });
};

exports.postSearch = (req, res, next) => {};

// tìm dữ liệu
exports.getSearch = (req, res, next) => {
  if (
    req.query['keyword'] ||
    req.query['genre'] ||
    req.query['media_type'] ||
    req.query['language'] ||
    req.query['year']
  ) {
    const page = req.query.page || 1;
    const keyword = req.query.keyword;
    const genre = req.query.genre;
    const media_type = req.query.media_type;
    const original_language = req.query.language;
    const year = req.query.year;

    const movies = Movie.fetchAll();

    // if (!keyword) {
    //   return res.status(400).json({ message: 'Not found keyword parram' });
    // }

    let filterMovies = movies;

    if (keyword !== '')
      filterMovies = filterMovies.filter(
        item =>
          item.overview?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.title?.toLowerCase().includes(keyword.toLowerCase())
      );

    if (genre !== '') {
      const genres = Genre.fetchAll();
      const genreHandler = genres.find(
        item => item.name.toLowerCase() === genre.toLowerCase()
      );
      const genre_ids = genreHandler.id;
      filterMovies = filterMovies.filter(item =>
        item.genre_ids.includes(+genre_ids)
      );
    }

    if (media_type !== '') {
      filterMovies = filterMovies;
      if (media_type !== 'all')
        filterMovies = filterMovies.filter(
          item => item.media_type === media_type
        );
    }

    if (original_language !== '')
      filterMovies = filterMovies.filter(
        item => item.original_language === original_language
      );

    if (year !== '')
      filterMovies = filterMovies.filter(
        item =>
          new Date(item.release_date || item.first_air_date)
            .getFullYear()
            .toString() === year
      );

    filterMovies = filterMovies.sort((a, b) => {
      if (
        a.release_date > b.release_date ||
        a.first_air_date > b.first_air_date
      )
        return -1;
      if (
        a.release_date < b.release_date ||
        a.first_air_date < b.first_air_date
      )
        return 1;
      return 0;
    });

    const { results, total_pages } = resultsHandler(filterMovies, page);

    return res.status(200).json({ results, page, total_pages });
  }
};

// lấy dữ liệu
const fetchedMovies = (page, key) => {
  const movies = Movie.fetchAll();

  const sortMovies = movies.sort((a, b) => b[key] - a[key]);

  const { results, total_pages } = resultsHandler(sortMovies, page);

  return { results, page, total_pages };
};

// cài đặt số trang, số dữ liệu trên 1 trang
const resultsHandler = (arr, page) => {
  const results = paginate(arr, PAGE_SIZE, page);
  const total_pages = Math.ceil(arr.length / PAGE_SIZE);

  return { results, page, total_pages };
};
