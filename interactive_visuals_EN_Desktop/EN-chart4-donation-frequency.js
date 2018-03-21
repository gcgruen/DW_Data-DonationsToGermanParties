// Setting up the canvas
(function() {
  var margin = {top: 40, right: 15, bottom: 50, left: 90},
      width = 700 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

  var svg = d3.select("#chart4-donation-frequency")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 // Scales & Variables

 var parseDate = d3.timeParse("%Y-%m-%d")

 var xPositionScale = d3.scaleTime()
 	.domain([parseDate("2013-01-01"), parseDate("2017-12-31")])
 	.range([0,width])
 
 var yPositionScale = d3.scalePoint()
 	.domain(["AfD", "The Left party", "The Greens","FDP", "SPD","CSU","CDU"])
 	.range([height,0])

 // Read in data

 d3.queue()
 	.defer(d3.csv, "data/EN-data-chart4-donations-50kplus-2013-2017_09-06-cleaned-refined.csv", 
 		function(d){
 		d.donation_date = parseDate(d.date_received)
 		d.donation = +d.amount_donated
 		return d
 	})
 	.await(ready)

 // Maniupulate data

 function ready (error, datapoints, regions){

// draw lines

	var normal_width = 2
	var highlighted_width = 3
	var line_length =26

	svg.selectAll("rect")
		.data(datapoints)
		.enter().append("rect")
		.attr("class", function(d){
			return d.receiving_party.replace(/ /g,"") + "-grossspende"
		})
		.attr("id", function(d){
			return d.donor_name.replace(/[^a-zA-Z0-9]/g,"")
		})
		.attr("width", normal_width)
		.attr("height", line_length)
		.attr("x", function(d){
			return xPositionScale(d.donation_date)
		})
		.attr("y", function(d){
			return yPositionScale(d.receiving_party) - (line_length/2)
		})
		.classed("grossspende-inaktiv", true)
// implement highlighting on mouseover
		.on('mouseover', function(d){

			d3.selectAll("#" + this.getAttribute("id"))
				.classed("grossspende-inaktiv", false)
				.attr("width", highlighted_width)
				.raise()
				
			d3.select("#label")
				.html(function(){
					return "Donor: " + d.donor_name
				})
				.style("font-weight", "bold")
		})

		.on('mouseout', function(d){
			svg.selectAll("#" + this.getAttribute("id"))
				.classed("grossspende-inaktiv", true)
				.attr("width",normal_width)

			d3.select("#label")
				.html("Move your mouse over a line to see who this major donation is from")
				.style("font-weight", "normal")
		})

// Axes
	var xAxis = d3.axisBottom(xPositionScale)
		.tickArguments([d3.timeYear.every(1)])
		.tickFormat(d3.timeFormat("%Y"))

      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (height + (line_length/2) + 10) + ")")
        .call(xAxis)

      var yAxis = d3.axisLeft(yPositionScale)
      	.ticks(7)
      	.tickPadding(10)
    	.tickSize(0)

      svg.append("line")
	    .attr ("id", "axisline")
	    .attr("x1", 0.5)
	    .attr("y1", height)
	    .attr("x2", 0.5)
	    .attr("y2", height + 23)
	    .attr("stroke-width", 1.5)
	    .attr("stroke", "#778D9E")

      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

 }

})();