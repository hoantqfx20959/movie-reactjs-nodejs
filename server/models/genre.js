const fs = require('fs');

const Genre = {
  fetchAll: function () {
    return JSON.parse(fs.readFileSync('./data/genreList.json', 'utf8'));
  },
};

module.exports = Genre;
