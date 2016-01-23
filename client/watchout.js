// start slingin' some d3 here.
var height = 600;
var width = 800;
var enemyRadius = 30;
var heroRadius = 15;
var time = 0;
var highScore = 0;
var collisions = 0;

var createBadGuys = function() {
  var badGuys = [];
  for (var i = 0; i < 20; i++) {
    var cx = Math.floor(Math.random() * (width - 2 * enemyRadius)) + enemyRadius;
    var cy = Math.floor(Math.random() * (height - 2 * enemyRadius)) + enemyRadius;
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
  badGuy.x = Math.floor(Math.random() * (width - 2 * enemyRadius)) + enemyRadius;
  badGuy.y = Math.floor(Math.random() * (height - 2 * enemyRadius)) + enemyRadius;
  return badGuy;
};

var collisionCheck = function (badGuy) {
      // if SQUR ROOT of: (guys[i] x - hero x)sqrd + (guys[i] y - hero y) squrd <= hero radius + enemy radius 
      if(Math.sqrt(Math.pow((badGuy["cx"]["animVal"]["value"] - hero.attr('cx')),2) + Math.pow((badGuy["cy"]["animVal"]["value"] - hero.attr('cy')),2)) <= (heroRadius+enemyRadius)) {
        return true;
    }
    return false;
};

var mapBoard = function (badGuyArray) {
  var board = d3.select("svg").selectAll(".badGuys").data(badGuyArray);
  // UPDATE
  board.transition().duration(1000)
    .tween('custom', function() {
      if(collisionCheck(this)) {
        if(time>highScore) {
           highScore = time;
        }
        collisions++;
        time = 0;
        d3.select(".highscore span").text(highScore);
        d3.select(".current span").text(time);
        d3.select(".collisions span").text(collisions);
      }
     })
    .attr("cx",function (d) {return d.x;})
    .attr("cy",function (d) {return d.y;});
  // ENTER
  board.enter().append("circle")
    .attr("cx",function (d) {return d.x;})
    .attr("cy",function (d) {return d.y;})
    .attr('class','badGuys')
    .attr("r", "30")
    .attr("fill","yellow")
    .attr("stroke", "red");
  // EXIT
  board.exit().remove();
};

var timer = function () {
  setInterval(function () {
    time++;
    d3.select(".current span").text(time);
  }, 1000);
};

var createHero = function () {
  // var hero = data();
  //d3.select("svg").append("cicle").attr('class','draggable');
  // ENTER

  var drag = d3.behavior.drag()
  // var circle = d3.select('.draggable');
  .on('dragstart',function () { 
    hero.style('fill', 'white');
    timer(); })
  .on('drag', function () { 
    hero.attr('cx', d3.event.x)
    .attr('cy', d3.event.y); })
  .on('dragend',function () { 
    hero.style('fill', 'green'); });

  hero.enter().append("circle")
    .attr('class','draggable')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', heroRadius)
    .attr('fill','green')
    .call(drag);

};



var hero = d3.select("svg").selectAll(".draggable").data("hero");
var guys = createBadGuys();
mapBoard(guys);
createHero();


setInterval(function() {
  adjustLocation(guys, randomLocation);
  mapBoard(guys);
}, 1000);




// board