const Users = require('../models/userToken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const users = Users.fetchAll();

  const checkUser = users.find(item => item.token === token);
  if (!checkUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
