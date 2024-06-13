const fs = require('fs');

const Video = {
  fetchAll: function () {
    return JSON.parse(fs.readFileSync('./data/videoList.json', 'utf8'));
  },
};

module.exports = Video;
