const fs = require('fs');

const Users = {
  fetchAll: function () {
    return JSON.parse(fs.readFileSync('./data/userToken.json', 'utf8'));
  },
};

module.exports = Users;
