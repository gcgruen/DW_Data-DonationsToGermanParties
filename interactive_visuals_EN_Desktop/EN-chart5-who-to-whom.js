// on mousing over the bubble, not only highlight the lines
// but 

(function() {
  var width = 700 
  var height = 350;

  var svg = d3.select("#chart5-who-to-whom")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

 // Scales & Variables

// var formatter = d3.format(".2f");
 var Million_formatter = d3.format(","); 

var radiusScale = d3.scaleSqrt().domain([0,5000000]).range([1,50])

var spd_color = "#d72805"
var cdu_color = "#000000"
var csu_color = "#3e3e3e"
var gruene_color = "#6ea500"
var fdp_color = "#ebd205"
var linke_color = "#f7007d"
var afd_color = "#5591b9"

var forceX = d3.forceX().strength(0.05)
var forceY = d3.forceY().strength(0.05)
var forceCollide = d3.forceCollide(function(d){
  return radiusScale(d.values[0].total_amount) + 1.5
  })

var simulation = d3.forceSimulation()
  .force("x", forceX)
  .force("y", forceY)
  .force("collide", forceCollide)

d3.queue()
  .defer(d3.csv, "data/EN-data-chart5-donornetwork.csv", function(d){
      d.total_amount = +d.total_amount
      d.toSPD =+d.SPD
      d.toCDU =+d.CDU
      d.toCSU =+d.CSU
      d.toFDP =+d.FDP
      d.toAfD =+d.AfD
      d.toGruene =+d.Gruene
      d.toLinke=+d.Linke
    return d
  })
  .await(ready)

 // Read in data

  function ready(error, datapoints) {

  // draw static party rects

    var box_width = 140
    var box_height = 18
    var box_fill = "#ffffff"
    var box_label_font = "Georgia"
    var box_stroke = "#3e3e3e"
    var colored_box_width = box_width-60
    
    var spd_x = 195
    var spd_y = -135

    svg.append("text")
        .text("Move your mouse over a circle to learn more about a donor")
        .attr("x", -335)
        .attr("y", -150)
        .attr("id", "legend-text")
        .style("fill", "#3e3e3e")


// appending all the static party rectangles
    svg.append("rect")
          .attr("id", "SPD")
          .attr("x", spd_x)
          .attr("y",spd_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", "#ffffff")
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "SPD-label-place")
          .attr("x", spd_x +1)
          .attr("y",spd_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", spd_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("SPD")
          .attr("x", spd_x + 100)
          .attr("y",spd_y+ 13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)

    var cdu_x = -335
    var cdu_y = -135

    svg.append("rect")
          .attr("id", "CDU")
          .attr("x",cdu_x)
          .attr("y",cdu_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "CDU-label-place")
          .attr("x", cdu_x +59)
          .attr("y", cdu_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", cdu_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("CDU")
          .attr("x", cdu_x+15)
          .attr("y",cdu_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)


    var csu_x = -335
    var csu_y = -100

    svg.append("rect")
          .attr("id", "CSU")
          .attr("x",csu_x)
          .attr("y",csu_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "CSU-label-place")
          .attr("x", csu_x +59)
          .attr("y", csu_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", csu_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("CSU")
          .attr("x", csu_x+15)
          .attr("y",csu_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)

    var fdp_x = -335
    var fdp_y = 10

    svg.append("rect")
          .attr("id", "FDP")
          .attr("x",fdp_x)
          .attr("y",fdp_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "FDP-label-place")
          .attr("x", fdp_x +59)
          .attr("y", fdp_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", fdp_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("FDP")
          .attr("x", fdp_x+15)
          .attr("y",fdp_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)


    var gruene_x = 195
    var gruene_y = -65

    svg.append("rect")
          .attr("id", "Grüne")
          .attr("x",gruene_x)
          .attr("y",gruene_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "Gruene-label-place")
          .attr("x", gruene_x +1)
          .attr("y",gruene_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", gruene_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("Greens")
          .attr("x", gruene_x+93)
          .attr("y",gruene_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)


    var linke_x = 195
    var linke_y = 60

    svg.append("rect")
          .attr("id", "Linke")
          .attr("x",linke_x)
          .attr("y",linke_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "Linke-label-place")
          .attr("x", linke_x +1)
          .attr("y", linke_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", linke_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("The Left")
          .attr("x", linke_x+90)
          .attr("y",linke_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)


    var afd_x = -335
    var afd_y = 105

    svg.append("rect")
          .attr("id", "AfD")
          .attr("x",afd_x)
          .attr("y",afd_y)
          .attr("width", box_width)
          .attr("height", box_height)
          .attr("fill", box_fill)
          .attr("stroke", box_stroke)
    svg.append("rect")
          .attr("id", "AfD-label-place")
          .attr("x", afd_x +59)
          .attr("y", afd_y+1)
          .attr("width", colored_box_width)
          .attr("height", box_height-2)
          .attr("fill", afd_color)
          .attr("stroke", "none")
    svg.append("text")
          .text("AfD")
          .attr("x", afd_x+17)
          .attr("y",afd_y+13)
          .style("fill", "#3e3e3e")
          .style("font-family", box_label_font)

// visualize donors as bubbles
  var nested = d3.nest()
    .key(function(d){ return d.name})
    .entries(datapoints)

  var node_fill_normal = "#CDD5DB"
  // var node_fill_normal = "#BAC5CE"
  var node_fill_highlighted = "#95A6B3"

  var nodes = svg.selectAll(".donor")
   	.data(nested)
   	.enter().append("circle")
   	.attr("class", "donor")
    .attr("id", function(d){
      return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
    })
   	.attr("r", function(d){
      return radiusScale(d.values[0].total_amount)
   	})
   	.attr("fill", node_fill_normal)
   	.attr("stroke", "white")
    .attr("stroke-width", 1)

  simulation.nodes(nested)
    .on("tick", ticked)

  function ticked() {

// position nodes and draw lines
   	nodes
   		.attr("cx", function(d){ return d.x	})
   		.attr("cy", function(d){ return d.y	})
      .on("mouseover", function(d){

// raise selected bubble
        d3.select(this)
          .raise()
          .style("fill", node_fill_highlighted)
          .style("stroke-width", "none")

// change legend text to donor name
        d3.select("#legend-text")
          .data(nested)
          .text(function(){
            return "Donor: " + d.key
          })
          .style("font-weight", "bold")

// highlight label for each party
        svg.selectAll("#" + this.getAttribute("id"))
          .style("stroke", "#778D9E")

        svg.selectAll("#spd-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")

        svg.selectAll("#cdu-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")

        svg.selectAll("#csu-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")

        svg.selectAll("#fdp-label-" + this.getAttribute("id"))
          .style("fill", "#3e3e3e")

        svg.selectAll("#linke-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")

        svg.selectAll("#gruene-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")

        svg.selectAll("#afd-label-" + this.getAttribute("id"))
          .style("fill", "#ffffff")


// create value labels and lines for each party
        svg.selectAll(".donor-spd-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-spd-labels")
          .text(function(d){
            if (d.values[0].toSPD > 0)
              return "€" + Million_formatter(d.values[0].toSPD)
          })
          .attr("id", function(d){
            return "spd-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", spd_x + 8)
          .attr("y", spd_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".spd-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("spd-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", spd_x )
          .attr("y2", spd_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toSPD > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")


        svg.selectAll(".donor-cdu-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-cdu-labels")
          .text(function(d){
            if (d.values[0].toCDU > 0)
              return "€" + Million_formatter(d.values[0].toCDU)
          })
          .attr("id", function(d){
            return "cdu-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", cdu_x + 66)
          .attr("y", cdu_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".cdu-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("cdu-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", cdu_x + box_width)
          .attr("y2", cdu_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toCDU > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")

        svg.selectAll(".donor-csu-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-csu-labels")
          .text(function(d){
            if (d.values[0].toCSU > 0)
              return "€" + Million_formatter(d.values[0].toCSU)
          })
          .attr("id", function(d){
            return "csu-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", csu_x + 66)
          .attr("y", csu_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".csu-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("csu-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", csu_x + box_width)
          .attr("y2", csu_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toCSU > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")

        svg.selectAll(".donor-linke-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-linke-labels")
          .text(function(d){
            if (d.values[0].toLinke > 0)
              return "€" + Million_formatter(d.values[0].toLinke)
          })
          .attr("id", function(d){
            return "linke-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", linke_x + 8)
          .attr("y", linke_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".linke-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("linke-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", linke_x )
          .attr("y2", linke_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toLinke > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")


        svg.selectAll(".donor-gruene-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-gruene-labels")
          .text(function(d){
            if (d.values[0].toGruene > 0)
              return "€" + Million_formatter(d.values[0].toGruene)
          })
          .attr("id", function(d){
            return "gruene-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", gruene_x + 8)
          .attr("y", gruene_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".gruene-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("gruene-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", gruene_x )
          .attr("y2", gruene_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toGruene > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")


        svg.selectAll(".donor-fdp-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-fdp-labels")
          .text(function(d){
            if (d.values[0].toFDP > 0)
              return "€" + Million_formatter(d.values[0].toFDP)
          })
          .attr("id", function(d){
            return "fdp-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", fdp_x + 66)
          .attr("y", fdp_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".fdp-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("fdp-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", fdp_x + box_width)
          .attr("y2", fdp_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toFDP > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")


        svg.selectAll(".donor-afd-labels")
          .data(nested)
          .enter().append("text")
          .attr("class", "donor-afd-labels")
          .text(function(d){
            if (d.values[0].toAfD > 0)
              return "€" + Million_formatter(d.values[0].toAfD)
          })
          .attr("id", function(d){
            return "afd-label-"+ d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .attr("x", afd_x + 66)
          .attr("y", afd_y + 13)
          .style("fill", "none")
          .style("font-weight", "bold")
          .style("font-family", "Arial")

        svg.selectAll(".afd-donor-line")
          .data(nested)
          .enter().append("line")
          .attr("id", function(d){
            return d.key.toLowerCase().replace(/[^a-zA-Z0-9]/g,"")
          })
          .classed("afd-donor-line", true)
          .attr("x1", function(d){ return d.x })
          .attr("y1", function(d){ return d.y })
          .attr("x2", afd_x + box_width)
          .attr("y2", afd_y + box_height/2)
          .style("stroke-width", function(d){
            if (d.values[0].toAfD > 0)
              return "2px"
            else
              return "0px"
          })
          .style("stroke", "none")
      })
      .on("mouseout", function(d){

        d3.select("#legend-text")
          .data(nested)
          .text(function(d){
            return "Move your mouse over a circle to learn more about a donor"
          })
          .style("font-weight", "normal")

        svg.selectAll("#" + this.getAttribute("id"))
          .style("stroke", "none")

        d3.select(this)
          .lower()
          .style("fill", node_fill_normal)
          .style("stroke", "white")
          .style("stroke-width", 1)

        svg.selectAll("#spd-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#cdu-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#csu-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#fdp-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#gruene-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#linke-label-" + this.getAttribute("id"))
          .style("fill", "none")

        svg.selectAll("#afd-label-" + this.getAttribute("id"))
          .style("fill", "none")

      })
    }

  }

})();




