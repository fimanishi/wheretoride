const express = require('express');
const app = express();
const cors = require('cors');
const promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: promise,
});
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

pgp.pg.defaults.ssl = true;

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
  var place = req.body.place;
  var coords;
  var markers = [];
  db.any(`SELECT lat, lng FROM coordinates WHERE places_id = '${place}'`)
  .then(function(results){
    coords = results;
    return db.any(`SELECT lat, lng FROM markers WHERE places_id = '${place}'`); 
  })
  .then(function(results2){
    results2.forEach(item =>{
      markers.push({position: {lat: item.lat, lng: item.lng}, defaultAnimation: 2})
    })
    res.json({coords: coords, markers: markers});
  })
});

app.post('/api/places', function (req, res) {
  var city = req.body.city.toLowerCase();
  db.any(`SELECT places.id, location, lat, lng, distance, path, difficulty FROM places INNER JOIN cities ON places.cities_id = cities.id WHERE cities.city = '${city}'`)
  .then(function(results){
    res.json(results);
  })
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);

});
