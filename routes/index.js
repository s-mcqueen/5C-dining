
/*
 * GET home page.
 */

var request = require('request');
var moment = require('moment');
var util = require('util');

function getTemp(callback) {
  var claremontLat = 34.103235;
  var claremontLon = -117.708764;
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s';
  var requestUrl = util.format(weatherUrl, claremontLat, claremontLon);
  request(requestUrl, function (error, response, body){
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body);
      var kelvinTemp = parsed.main.temp;
      // convert from kelvin
      var fTemp = parseInt((1.8 * (kelvinTemp - 273.15)) + 32);
      callback(fTemp.toString() + '°');
    } else {
      callback('');
    }
  });
}

exports.index = function(req, res){
      res.render('index');
};

exports.api = function(req, res) {
  request('http://dining-api.herokuapp.com/all', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  }); 
};
