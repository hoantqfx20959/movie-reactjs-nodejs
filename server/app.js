const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const movieRoutes = require('./routes/movie');
const auth = require('./middleware/auth');

// app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(cors());

app.use('/api', movieRoutes);

// sai endpoint
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(5000);
