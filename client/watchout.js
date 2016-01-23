// start slingin' some d3 here.
var height = 600;
var width = 800;
var radius = 30;

var createBadGuys = function() {
  var badGuys = [];
  for (var i = 0; i < 20; i++) {
    var cx = Math.floor(Math.random() * (width - 2 * radius)) + radius;
    var cy = Math.floor(Math.random() * (height - 2 * radius)) + radius;
    badGuys.push({x: cx, y: cy});
  }
  return badGuys;
};

var adjustLocation = function(badGuys, callback) {
  for (var i = 0; i < 20; i++) {
    badGuys[i] = callback(badGuys[i]);
  }
};

var randomLocation = function(badGuy) {
  badGuy.x = Math.floor(Math.random() * (width - 2 * radius)) + radius;
  badGuy.y = Math.floor(Math.random() * (height - 2 * radius)) + radius;
  return badGuy;
};

var mapBoard = function (badGuyArray) {
  var board = d3.select("svg").selectAll(".badGuys").data(badGuyArray);

  // UPDATE
  board.transition().duration(1000).attr("cx",function (d) {return d.x;}).attr("cy",function (d) {return d.y;});
  // ENTER
  board.enter().append("circle")
    .attr("cx",function (d) {return d.x;})
    .attr("cy",function (d) {return d.y;})
    .attr('class','badGuys')
    .attr("r", "30")
    .attr("fill","yellow")
    .attr("stroke", "red")
;
  // EXIT
  board.exit().remove();
};



var createHero = function () {
  // var hero = data();
  //d3.select("svg").append("cicle").attr('class','draggable');
  // ENTER
  var hero = d3.select("svg").selectAll(".draggable").data("hero");

  var drag = d3.behavior.drag()
  // var circle = d3.select('.draggable');
  .on('dragstart',function () { hero.style('fill', 'white'); })
  .on('drag', function () { hero.attr('cx',d3.event.x)
                                  .attr('cy', d3.event.y); })
  .on('dragend',function () { hero.style('fill', 'green'); });

  hero.enter().append("circle")
    .attr('class','draggable')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', radius / 2)
    .attr('fill','green')
    .call(drag);
};

var guys = createBadGuys();
mapBoard(guys);
createHero();




setInterval(function() {
  adjustLocation(guys, randomLocation);
  mapBoard(guys);
}, 1000);

// board