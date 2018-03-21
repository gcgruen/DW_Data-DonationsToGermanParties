(function() {
  var margin = {top: 40, right: 100, bottom: 40, left: 50},
      width = 700 - margin.left - margin.right,
      height = 394 - margin.top - margin.bottom;

  var svg = d3.select("#chart2-barchart-money-donated")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 // Scales & Variables

 var xPositionScale = d3.scalePoint()
 	.range([70,width])

 var yPositionScale = d3.scaleLinear()
 	.domain([0,90000000])
 	.range([height,0])

 var colorScale = d3.scaleOrdinal()
  .domain(["Spenden gesamt", "Großspenden"])
  .range(["#DC0F6E","#EB6E14"])

 var dur_time = 550

 var bar_width = 50

 var bar_width_g = 49


// Defining the four different tooltips

 var Million_formatter = d3.format(","); 
 
 var tippartyone = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function (d){
    return d.key + "</br>" + "Donations since 2013: "+ Million_formatter(d.values[0].donation) + "</br>" + "Of which major donations: " + Million_formatter(d.values[1].donation)
  });

  svg.call(tippartyone);

 var tippartytwo = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function (d){
    return d.key + "</br>" + "Major donations: " + Million_formatter(d.values[1].donation)
      });

  svg.call(tippartytwo);

 var tipyearone = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function (d){
    if (d.values[0].donation == 0)
      return d.key + "</br>" + "Total donations: not public yet" + "</br>" + "Major donations: " + Million_formatter(d.values[1].donation)
    else
      return d.key + "</br>" + "Total donations: "+ Million_formatter(d.values[0].donation) + "</br>" + "Of which major donations: " + Million_formatter(d.values[1].donation)
  });

  svg.call(tipyearone);

 var tipyeartwo = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10,0])
  .html(function (d){
    return d.key + "</br>" + "Major donations: " + Million_formatter(d.values[1].donation)
  });

  svg.call(tipyeartwo);

 // Read in data

  d3.queue()
 	.defer(d3.csv, "data/EN-data-chart2A-donations_by_party-09-08.csv", 
 		function(d){
      d.donation = +d.value
 		return d
 	})
  	.defer(d3.csv, "data/EN-data-chart2B-donations_by_year-09-09.csv", 
    function(c){
      c.donation = +c.value
    return c
  })
 	.await(ready)

 // Maniupulate data

 function ready (error, datapoints, cdatapoints){

  var nested_party = d3.nest()
    .key(function (d){ return d.party})
    .entries(datapoints)

  xPositionScale.domain(["CDU", "CSU", "SPD","FDP","The Greens","AfD","The Left party"])

// DRAW DEFAULT VIEW: BY PARTY

	svg.selectAll("rect")
		.data(nested_party)
		.enter().append("rect")
    .attr("id", function(d){
      return d.key.replace(/ /g,"")
   	})
	  .attr("class", function(d){
      return d.key.replace(/ /g,"") + "-spende"
    })
    .classed("party_total", true)
		.attr("x",function(d){
			return xPositionScale(d.key) - bar_width/2
		})
		.attr("y",function(d){
     	return yPositionScale(d.values[0].donation)
   	})
		.attr("width", bar_width)
		.attr("height", function(d){
      return height - yPositionScale(d.values[0].donation)
    })
    .style("stroke", "#ffffff")
    .style("stroke-width", "1px")
	  .on("mouseover", tippartyone.show)
    .on("mouseout", tippartyone.hide)

  svg.selectAll(".grossspendenparty")
    .data(nested_party)
    .enter().append("rect")
    .attr("class", function(d){
      return d.key.replace(/ /g,"") + "-grossspende"
    })
    .classed("grossspendenparty", true)
    .attr("x",function(d){
      return xPositionScale(d.key) - bar_width_g/2
    })
    .attr("y",function(d){
      return yPositionScale(d.values[1].donation)
    })
    .attr("width", bar_width_g)
    .attr("height", function(d){
      return height - yPositionScale(d.values[1].donation)
    })

    var yAxis = d3.axisLeft(yPositionScale)
    .ticks(8)
    .tickFormat(function(d){
      if (d==0)
        return d.toLocaleString('de-DE')
      else
        return formatValue(d).replace('M', '')
    });

// ADDING BUTTON FUNCTIONALITY FOR BUTTON "BIG DONATIONS ONLY" BY PARTY
  d3.select("#bigdonations-party")
    .on("click", function(){

      svg.selectAll("rect")
        .remove()
      svg.selectAll("#legend")
        .remove()

	    yPositionScale.domain([0,6000000])
	    xPositionScale.domain(["CDU", "CSU", "SPD","FDP","The Greens","AfD","The Left party",])

	    svg.selectAll("rect")
		  .data(nested_party)
		  .enter().append("rect")
	      .attr("y", function(d){
	         return yPositionScale(d.values[1].donation)
	      })
	      .attr("height", function(d){
	         return height - yPositionScale(d.values[1].donation)
	      })
	      .attr("x",function(d){
	         return xPositionScale(d.key) - bar_width_g/2
	      })
	      .attr("width", bar_width_g)
	      .classed("grossspendenparty", true)
        .attr("class", function(d){
            return d.key.replace(/ /g,"") + "-grossspende"
        })
	      .on("mouseover",tippartytwo.show)
	      .on("mouseout", tippartytwo.hide)

	    svg.select(".x-axis")
	      .call(xAxis)

      var formatsmallValue = d3.format(".1s");

      var yAxis = d3.axisLeft(yPositionScale)
          .ticks(6)
          .tickFormat(function(d){
            // return d.toLocaleString('de-DE')
            if (d==0)
               return d.toLocaleString('de-DE')
            else
                return formatsmallValue(d).replace('M', '')
          });

	    svg.select(".y-axis")
	      .call(yAxis)

    })

// ADDING FUNCTIONALITY TO BUTTON "BY PARTY"
  d3.select("#party")
    .on("click", function(){

      svg.selectAll("rect")
        .remove()
      svg.selectAll("#legend")
        .remove()

      xPositionScale.domain(["CDU", "CSU", "SPD","FDP","The Greens","AfD","The Left party"])
      yPositionScale.domain([0, 90000000]).nice()

      svg.selectAll("rect")
    		.data(nested_party)
    		.enter().append("rect")
        .attr("id", function(d){
          return d.key.replace(/ /g,"")
        })
        .attr("class", function(d){
          return d.key.replace(/ /g,"") + "-spende"
        })
        .classed("party_total", true)
        .attr("height", function(d){
          return height - yPositionScale(d.values[0].donation)
        })
        .attr("y",function(d){
          return yPositionScale(d.values[0].donation)
        })
        .attr("x",function(d){
          return xPositionScale(d.key) - bar_width/2
         })
        .attr("width", bar_width)
        .style("stroke", "#ffffff")
        .style("stroke-width", "1px")
        .on("mouseover",tippartyone.show)
        .on("mouseout",tippartyone.hide)

      svg.selectAll(".grossspendenparty")
        .data(nested_party)
        .enter().append("rect")
        .attr("class", function(d){
          return d.key.replace(/ /g,"") + "-grossspende"})
        .classed("grossspendenparty", true)
        .attr("x",function(d){
          return xPositionScale(d.key) - bar_width_g/2
        })
        .attr("y",function(d){
          return yPositionScale(d.values[1].donation)
        })
        .attr("width", bar_width_g)
        .attr("height", function(d){
          return height - yPositionScale(d.values[1].donation)
        })

      var yAxis = d3.axisLeft(yPositionScale)
        .ticks(8)
        .tickFormat(function(d){
          if (d==0)
            return d.toLocaleString('de-DE')
          else
            return formatValue(d).replace('M', '')
        });

      svg.select(".y-axis")
        .call(yAxis)

      svg.select(".x-axis")
        .call(xAxis)

    })

 // ADDING FUNCTIONALITY BY YEAR BUTTON

 	var nested_year = d3.nest()
	    .key(function(c){return c.year})
	    .entries(cdatapoints) 

	d3.select("#year")
      .on("click", function(){

      xPositionScale.domain(["2013","2014","2015","2016","2017"])
      yPositionScale.domain([0,90000000])
        
      svg.selectAll("rect")
        .remove()

      svg.selectAll("#legend")
        .remove()

      svg.selectAll("rect")
        .data(nested_year)
        .enter().append("rect")
        .attr("id", function(c){
          return "y" + c.key.replace(/ /g,"")
        })
        .classed("year_total", true)
        .attr("x", function(c){
          return xPositionScale(c.key) - bar_width/2
        })
        .attr("y", function(c){
          return yPositionScale(c.values[0].donation)
        })
        .attr("width", bar_width)
        .attr("height", function(c){
          return height - yPositionScale(c.values[0].donation)
        })
        .attr("fill","#CDD5DB")
        .style("stroke", "#ffffff")
        .style("stroke-width", "1px")
      	.on("mouseover", tipyearone.show)
        .on("mouseout", tipyearone.hide)

      svg.selectAll(".grossspendenyearly")
        .data(nested_year)
        .enter().append("rect")
        .attr("class", function(c){
          return "y" + c.key + "-grossspende"
        })
        .classed("grossspendenyearly", true)
        .attr("x",function(c){
          return xPositionScale(c.key) - bar_width_g/2
        })
        .attr("y",function(c){
          return yPositionScale(c.values[1].donation)
        })
        .attr("width", bar_width_g)
        .attr("height", function(c){
          return height - yPositionScale(c.values[1].donation)
        })
        .attr("fill", "#95A6B3")
        .on("mouseover", tipyearone.show)
        .on("mouseout", tipyearone.hide)

      svg.select(".x-axis")
        .call(xAxis)

      var yAxis = d3.axisLeft(yPositionScale)
        .ticks(8)
        .tickFormat(function(d){
          if (d==0)
            return d.toLocaleString('de-DE')
          else
            return formatValue(d).replace('M', '')
        });

      svg.select(".y-axis")
        .call(yAxis)

      svg.append("text")
        .text("Total donations for all parties per year")
        .attr("id", "legend")
        .attr("x", width - 280 )
        .attr("y", 5)
        .style("fill", "#778D9E")

      svg.append("text")
        .text("For 2016 and 2017, only data on major donations available")
        .attr("id", "legend")
        .attr("x", width - 280 )
        .attr("y", 18)
        .style("fill", "#778D9E")

    })  

// ADDING FUNCTIONALITY FOR BIG DONATIONS BY YEAR
  d3.select("#bigdonations-year")
      .on("click", function(){

      svg.selectAll("rect")
        .remove()

      svg.selectAll("#legend")
        .remove()

	    xPositionScale.domain(["2013", "2014", "2015", "2016", "2017"])
    	yPositionScale.domain([0,5000000])

      	svg.selectAll("rect")
	        .data(nested_year)
	        .enter().append("rect")
          .classed("grossspendenyearly", true)
	        .attr("y", function(c){
	          return yPositionScale(c.values[1].donation)
	        })
	        .attr("height", function(c){
	          return height - yPositionScale(c.values[1].donation)
	        })
	        .attr("x",function(c){
	        return xPositionScale(c.key) - bar_width_g/2
	        })
	        .attr("width", bar_width_g)
          .attr("fill", "#95A6B3")
        	.on("mouseover", function(c){
         		return tipyeartwo.show(c)
        	})
        	.on("mouseout", function(c){
          	return tipyeartwo.hide(c)
        	})

	      svg.select(".x-axis")
	        .call(xAxis)

        var formatsmallValue = d3.format(".1s");

        var yAxis = d3.axisLeft(yPositionScale)
            .ticks(6)
            .tickFormat(function(d){
              // return d.toLocaleString('de-DE')
              if (d==0)
                 return d.toLocaleString('de-DE')
              else
                  return formatsmallValue(d).replace('M', '')
            });

	      svg.select(".y-axis")
	        .call(yAxis)

        svg.append("text")
          .text("Total major donations for all parties per year")
          .attr("id", "legend")
          .attr("x", width - 205 )
          .attr("y", 5)
          .style("fill", "#778D9E")

      }) 

// Axes

  d3.formatDefaultLocale("de-GER")

  formatValue = d3.format(".2s");

	var xAxis = d3.axisBottom(xPositionScale)
		.ticks(7)
    .tickPadding(10)
    .tickSize(0)

  svg.append("line")
    .attr ("id", "axisline")
    .attr("x1", 0)
    .attr("y1", height + 0.5)
    .attr("x2", width + 45)
    .attr("y2", height + 0.5)
    .attr("stroke-width", 1.5)
    .attr("stroke", "#778D9E")

  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)
  .append("text")
    .text("million euros")
    .attr("class", "label")
    // .attr("transform", "rotate(-90)")
    .attr("x", 4)
    .attr("y", 5)
    .attr("text-anchor", "start");


}

})();
