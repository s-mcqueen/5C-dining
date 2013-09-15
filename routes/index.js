
/*
 * GET home page.
 */

var request = require('request');
var moment = require('moment');

exports.index = function(req, res){
  request('http://dining-api.herokuapp.com/all', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body);

      var days = {
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
        7: "sunday"
      }

      var today = days[moment().day()];

      var cmc = parsed.collins[today];
      var pitzer = parsed.pitzer[today];
      // Scripps currently has API issues
      // var scripps = parsed.scripps[today];
      var mudd = parsed.mudd[today];
      var frary = parsed.frary[today];
      var frank = parsed.frank[today];

      res.render('index',
        {
          title: 'Dining Halls',
          cmc: cmc,
          // scripps: scripps,
          pitzer: pitzer,
          mudd: mudd,
          frank: frank,
          frary: frary
        });
    }
  })
};
