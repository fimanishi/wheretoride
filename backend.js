const express = require('express');
const app = express();
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

var coords = [];

db.any(`SELECT lat, lng FROM coordinates WHERE cities_id = 1`)
  .then(function(results){
    results.forEach(function (item){
      coords.push(item);
    })
    console.log(coords);
  })



app.use(express.static('build'));

app.post('/api', function () {
  
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);

});
