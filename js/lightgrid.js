$( document ).ready(function() {

    let _RAF_ = -1;
    const raf = (cb)=>{
      if(_RAF_ > 0){
        window.cancelAnimationFrame(_RAF_);
      }
      _RAF_ = window.requestAnimationFrame(cb);
    };
    
    
      var WIDTH = 1920
      var HEIGHT = 1080
      var GRID = 40
      var mouse = [0, 0]
    
      function sigmoid(t) {
          return 1/(1+Math.pow(Math.E, -t));
      }
    
      var svg = d3.select("body").append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT)
          .on("mousemove", function() {
                mouse = d3.mouse(this);
              raf(paint);
          })
    
      var vectors = d3.range(48 * 25)
          .map(function(key) {
              return {
                  x: key % 48 * GRID,
                  y: Math.floor(key / 48) * GRID,
                  theta: 0
              }
          })
    
      var circles = svg.selectAll("g")
          .data(vectors).enter()
          .append('g').each(function(d) {
              var layer = d3.select(this)
    
              layer.append('path')
                  .attr('fill', '#ff0000')
                  //Change the (circle) svg size here.
                 .attr('d', 'M-2,0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0')
          })
    
      var paint = function() {
          vectors.forEach(function(d) {
              var dx = d.x - mouse[0]
              var dy = d.y - mouse[1]
              var dist = Math.sqrt(dx * dx + dy * dy)
              var opacity = 1.05-(sigmoid((dist - 10) / 60))
    
              d.color = 'rgba(255,255,255,'+opacity+')';
          })
    
          circles
              .attr("transform", function(d) {
                  return "translate(" + d.x + ", " + d.y + ")";
              })
              .each(function(d) {
                  var path = d3.select(this).select('path')
    
                  path.attr('fill', d.color)
              })
      }
    
      paint()
});


