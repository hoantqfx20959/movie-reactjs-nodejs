const fs = require('fs');

const Movies = {
  fetchAll: function () {
    return JSON.parse(fs.readFileSync('./data/movieList.json', 'utf8'));
  },
};

module.exports = Movies;
