var dataSet = {};
var days = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat"
}
// assumes it passes in breakfast, lunch, dinner, brunch (on correct days)
function update (current_day, current_time) {
  var today = days[current_day];
  var items = [];

  $('div#collins').html('');
  $('div#scripps').html('');
  $('div#mudd').html('');
  $('div#pitzer').html('');
  $('div#frary').html('');
  $('div#frank').html('');


  $.each(dataSet.collins.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#collins').append( items.join('') );
  items = [];
  $.each(dataSet.scripps.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#scripps').append( items.join('') );
  items = [];
  $.each(dataSet.mudd.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#mudd').append( items.join('') );
  items = [];
  $.each(dataSet.pitzer.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#pitzer').append( items.join('') );
  items = [];
  $.each(dataSet.frary.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#frary').append( items.join('') );
  items = [];
  $.each(dataSet.frank.today.current_time, function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#frank').append( items.join('') );

}
$(document).ready(function() {
  $.ajax({
      url: "http://dining-api.herokuapp.com/all",
      success: function(data) {
        if (data) {
          dataSet = data;
          update(5,"dinner");
        }
      }
  });
});