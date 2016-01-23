// start slingin' some d3 here.
var createBadGuys = function() {
  var badGuys = [];
  for (var i = 0; i < 20; i++) {
    var cx = Math.floor(Math.random() * 740) + 30;
    var cy = Math.floor(Math.random() * 540) + 30;
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
  badGuy.x = Math.floor(Math.random() * 740) + 30;
  badGuy.y = Math.floor(Math.random() * 540) + 30;
};

var mapBoard = function (badGuyArray) {
  var board = d3.select("svg").selectAll("circle").data(badGuyArray);

  // UPDATE
  board.attr("cx",function (d) {return d.x;}).attr("cy",function (d) {return d.y;});
  // ENTER
  board.enter().append("circle")
    .attr("cx",function (d) {return d.x;})
    .attr("cy",function (d) {return d.y;})
    .attr("r", "30")
    .attr("fill","yellow")
    .attr("stroke", "red")
;
  // EXIT
  board.exit().remove();
};

var guys = createBadGuys();
mapBoard(guys);