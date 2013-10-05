var dataSet = {};

  var $container = $('#container');
  $container.masonry({
    columnWidth: 30,
    itemSelector: '.gridItem',
    transitionDuration: '0.6',
    isFitWidth: true
  });
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

  $('div#collins div.data').html('');
  $('div#scripps div.data').html('');
  $('div#mudd div.data').html('');
  $('div#pitzer div.data').html('');
  $('div#frary div.data').html('');
  $('div#frank div.data').html('');


  $.each(dataSet["collins"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#collins div.data').html( items.join('') );
  items = [];

  $.each(dataSet["scripps"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#scripps div.data').html( items.join('') );
  items = [];
  $.each(dataSet["mudd"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#mudd div.data').html( items.join('') );
  items = [];
  $.each(dataSet["pitzer"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#pitzer div.data').html( items.join('') );
  items = [];
  $.each(dataSet["frary"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#frary div.data').html( items.join('') );
  items = [];
  $.each(dataSet["frank"][today][current_time], function(i, item) {
    items.push('<li>'+item+'</li>');
  });
  $('div#frank div.data').html( items.join('') );

    $container.masonry({
    columnWidth: 30,
    itemSelector: '.gridItem',
    transitionDuration: '0.6',
    isFitWidth: true
  });

}
$(document).ready(function() {


  $.ajax({
      url: "http://localhost:3000/api",
      success: function(data) {
        if (data) {
          dataSet = data;
          update(5,"dinner");
        }
      }
  });
});