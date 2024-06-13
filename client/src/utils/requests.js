const requests = {
  fetchNetflixOriginals: `http://localhost:5000/api/tv`,
  fetchTrending: `http://localhost:5000/api/movies/trending`,
  fetchTopRated: `http://localhost:5000/api/movies/top-rate`,
  fetchActionMovies: `http://localhost:5000/api/movies/discover?genre=action`,
  fetchComedyMovies: `http://localhost:5000/api/movies/discover?genre=comedy`,
  fetchHorrorMovies: `http://localhost:5000/api/movies/discover?genre=horror`,
  fetchRomanceMovies: `http://localhost:5000/api/movies/discover?genre=romance`,
  fetchDocumentaries: `http://localhost:5000/api/movies/discover?genre=documentary`,
  fetchSearch: `http://localhost:5000/api/movies/search`,
};

export default requests;
