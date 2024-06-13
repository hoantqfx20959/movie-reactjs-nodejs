import axios from 'axios';

/** base url to make request to the themoviedatabase */

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Basic RYoOcWM4JW`,
  },
});

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar

export default instance;
