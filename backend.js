const express = require('express');
const app = express();
const cors = require('cors');
const promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: promise,
});

// pgp.pg.defaults.ssl = true;

const db = pgp(process.env.DATABASE_URL||{
  host: 'localhost',
  // NOTE: change to your preferred port for development --
  // Must match your Postico settings
  port: 5432,
  database: 'wheretobike',
  user: 'postgres',
});

app.use(express.static('build'));
app.use(cors());

app.post('/api/coords', function (req, res) {
  db.any(`SELECT lat, lng FROM coordinates WHERE places_id = 1`)
  .then(function(results){
    console.log(results);
    res.json(results);
  })
});

app.post('/api/places', function (req, res) {
  db.any(`SELECT id, location FROM places WHERE cities_id = 1`)
  .then(function(results){
    res.json(results);
  })
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);

});
