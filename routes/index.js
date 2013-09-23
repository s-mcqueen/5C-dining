
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
      callback(fTemp);
    }
  });
}

exports.index = function(req, res){
  request('http://dining-api.herokuapp.com/all', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body);

      var days = {
        0: "sun",
        1: "mon",
        2: "tue",
        3: "wed",
        4: "thu",
        5: "fri",
        6: "sat"
      }

      var today = days[moment().day()];

      var cmc = parsed.collins[today];
      var pitzer = parsed.pitzer[today];
      var scripps = parsed.scripps[today];
      var mudd = parsed.mudd[today];
      var frary = parsed.frary[today];
      var frank = parsed.frank[today];

      var date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth()+1; //January is 0!
      var title = mm + '/' + dd;

      getTemp(function(temp){
        res.render('index',
          {
            title: title,
            temp: temp,
            cmc: cmc,
            scripps: scripps,
            pitzer: pitzer,
            mudd: mudd,
            frank: frank,
            frary: frary
          });
      })
    }
  })
};
