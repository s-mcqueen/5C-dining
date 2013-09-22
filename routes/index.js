
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
        0: "sun",
        1: "mon",
        2: "tue",
        3: "wed",
        4: "thu",
        5: "fri",
        6: "sat"
      }

      console.log(moment().day())
      var today = days[moment().day()];

      var cmc = parsed.collins[today];
      var pitzer = parsed.pitzer[today];
      var scripps = parsed.scripps[today];
      var mudd = parsed.mudd[today];
      var frary = parsed.frary[today];
      var frank = parsed.frank[today];

      res.render('index',
        {
          title: '5C dining Halls',
          cmc: cmc,
          scripps: scripps,
          pitzer: pitzer,
          mudd: mudd,
          frank: frank,
          frary: frary
        });
    }
  })
};
