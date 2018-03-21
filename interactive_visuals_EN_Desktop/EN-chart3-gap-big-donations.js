// Setting up the canvas
(function() {
  var margin = {top: 50, right: 120, bottom: 40, left: 80},
      width = 700 - margin.left - margin.right,
      height = 394 - margin.top - margin.bottom;

  var svg = d3.select("#chart3-gap-big-donations")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 // Scales & Variables

  var xPositionScale = d3.scalePoint()
  .domain(["CDU","FDP","SPD","CSU","The Greens","AfD","The Left party"])
  .range([50,width])

  var yPositionScale = d3.scaleLinear()
  .domain([0, 60])
  .range([height,0])

  var tipone = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10,0])
    .html(function(d){
      if (d.key == "The Greens")
        return d.key+"' " + d.values[0].documentation + " list <br/>" + d.values[0].value + " donations of over 50,000 euros"
      if (d.key == "The Left party")
        return d.key+"'s " + d.values[0].documentation + " list <br/>" + d.values[0].value + " donation of over 50,000 euros"
      else
        return "The " + d.key + "'s " + d.values[0].documentation + " list <br/>" + d.values[0].value + " donations of over 50,000 euros"
    })
    // .style("font-family", "Georgia")

  svg.call(tipone)


  var tiptwo = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10,0])
    .html(function(d){
        return "But only "+ d.values[1].value + " of these were " + "<br/> declared as a " + d.values[1].documentation
    })
    // .style("font-family", "Georgia")

  svg.call(tiptwo)

 // Read in data

 d3.queue()
  .defer(d3.csv, "data/EN-data-chart3-nichtmeldunggrossspenden.csv", 
    function(d){
    d.value = +d.value
    return d
  })
  .await(ready)

 // Axes
  var xAxis = d3.axisBottom(xPositionScale)
    .ticks(7)
    .tickPadding(10)
    .tickSize(0)

      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .style("stroke-width", "0px")
        .call(xAxis)

      svg.append("line")
        .attr ("id", "axisline")
        .attr("x1", 0)
        .attr("y1", height + 0.5)
        .attr("x2", width + 30)
        .attr("y2", height + 0.5)
        .attr("stroke-width", 1.5)
        .attr("stroke", "#778D9E")

      var yAxis = d3.axisLeft(yPositionScale)
        .ticks(5)

      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)
        .append("text")
        .text("Number of donations")
        .attr("class", "label")
        // .attr("transform", "rotate(-90)")
        .attr("x", 4)
        .attr("y", 5)
        .attr("text-anchor", "start");

 // Maniupulate data

 function ready (error, datapoints, regions){

  var nested = d3.nest()
    .key(function(d){return d.party})
    .entries(datapoints)

// draw connecting lines
  svg.selectAll(".connecting-lines")
    .data(nested)
    .enter().append("line")
    .attr("class", "connecting-lines")
    .attr("x1", function(d){
      return xPositionScale(d.key)
    })
    .attr("y1", function(d){
      return yPositionScale(d.values[0].value) + 5
    })
    .attr("x2", function(d){
      return xPositionScale(d.key)
    })
    .attr("y2", function(d){
      return yPositionScale(d.values[1].value)
    })
    .style("stroke-width", "1px")
    .style("stroke", "#778D9E")
    // .style("stroke", "#cdd5db")
    

// draw Rechenschaftsbericht circles
  svg.selectAll(".grossesummen-rechenschaftsbericht")
    .data(nested)
    .enter().append("circle")
    .attr("cx",function(d){
      return xPositionScale(d.key)
    })
    .attr("cy",function(d){
      return yPositionScale(d.values[0].value)
    })
    .attr("r", 6)
    .attr("class", "rechenschaftsbericht")
    .classed(".grossesummen-rechenschaftsbericht", true)
    .attr("stroke-width", "2px")
    .on("mouseover", tipone.show)
    .on("mouseout", tipone.hide)

// draw Meldewebsite circles
  svg.selectAll(".gemeldete-grossspenden")
    .data(nested)
    .enter().append("circle")
    .attr("cx",function(d){
      return xPositionScale(d.key)
    })
    .attr("cy",function(d){
      return yPositionScale(d.values[1].value)
    })
    .attr("r", 6)
    .attr("class", function(d){
      return d.key.replace(/ /g,"") + "-grossspende"
    })
    .classed("gemeldete-grossspenden", true)
    .attr("stroke-width", "2px")
    .on("mouseover", tiptwo.show)
    .on("mouseout", tiptwo.hide)



 }



})();