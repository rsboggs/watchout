// start slingin' some d3 here.
var createBadGuys = function() {
  var badGuys = [];
  for (var i = 0; i < 20; i++) {
    var cx = Math.floor(Math.random() * 950) + 25;
    var cy = Math.floor(Math.random() * 750) + 25;
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
  badGuy.x = Math.floor(Math.random() * 950) + 25;
  badGuy.y = Math.floor(Math.random() * 750) + 25;
};


