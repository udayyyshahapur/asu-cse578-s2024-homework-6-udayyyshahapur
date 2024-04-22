let svg, svgWildBar; 
const svgWidth = 1400;
const svgHeight = 800;

let total_data = [];
const margin = { top: 20, bottom: 200, left: 50, right: 20};
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;

circles_legend_values = [
    {text: "<= 69010.5", value: 69010.5},
    {text: "<= 352525.0", value: 352525.0},
    {text: "<= 238764.5", value: 238764.5},
    {text: "<= 817360.25", value: 817360.25},
    {text: "> 817360.25", value: 31159252},
]
const radiusValue = (value) => {
    if (value <= 69010.5) {
        return 5
    } else if (value <= 352525.0) {
        return 10
    } else if (value <= 238764.5) {
        return 15;
    } else if (value <= 817360.25){
        return 20;
    } else {
        return 30;
    }
}

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    svg = d3.select('#myDataVis') 
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .style('margin-top', '20px');

    svgWildBar = d3.select('#wildLifeVis') 
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .style('margin-top', '20px');

    Promise.all([d3.csv('data/final.csv')])
        .then(function (values) {
            total_data = values[0];
            drawCustomVis(svg); 
        }
    );
});

function drawCustomVis(svg) {
    // Creating X-Scale
    const xScale = d3.scaleLinear()
        .domain([-165, -60])
        .range([margin.left, innerWidth - 150]);

    // Creating Y-Scale
    const yScale = d3.scaleLinear()
        .domain([10, 70])
        .range([svgHeight - margin.bottom, margin.top]);
    
    // Clearing the chart to redraw next one
    svg.selectAll("*").remove();

    // Draw x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // X, Y Axes labels
    svg.append("text")
        .attr("transform", `translate(${svgWidth / 2}, ${svgHeight - margin.bottom / 2})`)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Longitude");

    svg.append("text")
        .attr("transform", `translate(0, ${svgHeight / 2}) rotate(-90)`)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Latitude");
        
    // Draw y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    svg.append("text")
     .attr("x", svgWidth / 2 - 50)
     .attr("y", margin.top /  2)
     .style("text-anchor", "middle")
     .style("font-size", "20px")
     .style("font-weight", "bold")
     .text("National Parks in the United States of America");

    var wildBubbleDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("border-bottom-style", "solid")
        .style("border-bottom-width", 1 + "px")
        .style("border-top-style", "solid")
        .style("border-top-width", 1 + "px");

    // Draw park locations
    svg.selectAll(".parks_location")
        .data(total_data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", (d) => xScale(d.Longitude))
        .attr("cy", d => yScale(d.Latitude))
        .attr("r", (d) => radiusValue(d.Acres))
        .style("opacity", 0.5)
        .attr("fill", "#EE6E6E")
        .on("mouseover", function(event,d) {
            wildBubbleDiv
                .style("opacity", 1)
                .html("State: "+ d.State + "<br/>" + "Size in Acres: "+ d.Acres+ "<br/>" + "Park: " + d['Park Name'])
                .style("border-radius" ,5 + "px")
                .style("border-bottom-style", "solid")
                .style("border-bottom-width", 2 + "px")
                .style("border-top-style", "solid")
                .style("border-top-width", 2 + "px")
                .style("border-left-style", "solid")
                .style("border-left-width", 2 + "px")
                .style("border-right-style", "solid")
                .style("border-right-width", 2 + "px")
                .style("left",  event.pageX + "px")
                .style("top", event.pageY - 20 + "px");
            svg.on("mousemove", function(event) {
                wildBubbleDiv
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
                });         
            })
        .on("mouseout", function(d) {
            wildBubbleDiv.style("opacity", 0);
        })
        .on("click", function(event, d) {
           drawWildLifeBar(svgWildBar, d);
           d3.select("#wildLifeVis").style("display", "block");
        });
    
    
    var xCircle = innerWidth - 150;
    var xLabel1 = innerWidth - 70;
    var xLabel2 = innerWidth - 230;
    
    svg.selectAll("legend")
        .data(circles_legend_values)
        .enter()
        .append("circle")
          .attr("cx", xCircle)
          .attr("cy", d => margin.top * 5 - radiusValue(d.value))
          .attr("r", d => radiusValue(d.value))
          .style("fill", "none")
          .attr("stroke", "black")
    
    svg.selectAll("legend")
        .data(circles_legend_values)
        .enter()
        .append("line")
          .attr('x1', (function(d, i) { return i % 2 === 0 ? xCircle + radiusValue(d.value) : xCircle - radiusValue(d.value) }))
          .attr('x2', (function(d, i) { return i % 2 === 0 ? xLabel1 : xLabel2; }))
          .attr('y1', function(d){ return (margin.top * 5) - radiusValue(d.value)  } )
          .attr('y2', function(d){ return (margin.top * 5) - radiusValue(d.value) } )
          .attr('stroke', 'black')
          .style('stroke-dasharray', ('2,2'))

    svg.selectAll("legend")
        .data(circles_legend_values)
        .enter()
        .append("text")
          .attr('x', (function(d, i) { return i % 2 === 0 ? xLabel1 : xLabel2 - 50; }))
          .attr('y', function(d){ return (margin.top * 5) - radiusValue(d.value) + 2 } )
          .text( function(d){ return d.text } )
          .style("font-size", "7px")
          .attr('alignment-baseline', 'middle')

    svg.append("text")
        .attr('x', xCircle)
        .attr("y", margin.top * 5 + 25)
        .text("Area of Park in Acres ")
        .attr("text-anchor", "middle")
        
}

function drawWildLifeBar(svg, d) {
    
    // Clearing the chart to redraw next one
    svg.selectAll("*").remove();

    const groups = ['Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish', 'Vascular Plant', 'Spider/Scorpion',
    'Insect', 'Invertebrate', 'Fungi', 'Nonvascular Plant', 'Crab/Lobster/Shrimp', 'Slug/Snail', 'Algae'];
    const barData = groups.map((item) => ({
        category: item,
        value: +d[item],
    }));
    svg.selectAll("*").remove();
    const stateData = total_data.filter((item) => item['Park Name'] === d['Park Name'])

    const categoryCount = stateData.map(d => [
            +d['Mammal'],
            +d['Bird'],
            +d['Reptile'],
            +d['Amphibian'],
            +d['Fish'],
            +d['Vascular Plant'],
            +d['Spider/Scorpion'],
            +d['Insect'],
            +d['Invertebrate'],
            +d['Fungi'],
            +d['Nonvascular Plant'],
            +d['Crab/Lobster/Shrimp'],
            +d['Slug/Snail'],
            +d['Algae'],
        ]
    );
    console.log('cate', categoryCount[0])
    const maxCategoryValue = Math.max(...categoryCount[0]);

    // Creating X-Scale
    const xScale = d3.scaleLinear()
        .domain([0, maxCategoryValue + 100])
        .range([margin.left, innerWidth]);

    // Creating Y-Scale        
    const yScale = d3.scaleBand()
        .domain(groups)
        .range([svgHeight - margin.bottom, margin.top])
        .padding(0.2);
    
    // Draw x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end"); 

    // X, Y Axes labels
    svg.append("text")
        .attr("transform", `translate(${svgWidth / 2 - 50}, ${ svgHeight - margin.bottom + 50})`)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Number of species per category in "+ d['Park Name']);
        
    // Draw y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    var wildBarDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("border-bottom-style", "solid")
        .style("border-bottom-width", 1 + "px")
        .style("border-top-style", "solid")
        .style("border-top-width", 1 + "px");

    // Show the bars
    svg.selectAll("myRect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("x", xScale(0) )
        .attr("y", function(d) { return yScale(d.category); })
        .attr("width", function(d) { return xScale(d.value - 60); })
        .attr("height", yScale.bandwidth() )
        .attr("fill", "#EE6E6E")
        .attr("opacity", 0.5)
        .on("mouseover", function(event,d) {
            wildBarDiv
                .style("opacity", 1)
                .html("Type: "+ d.category + "<br/><br/>" + "Count: " + d.value)
                .style("border-radius" ,5 + "px")
                .style("border-bottom-style", "solid")
                .style("border-bottom-width", 2 + "px")
                .style("border-top-style", "solid")
                .style("border-top-width", 2 + "px")
                .style("border-left-style", "solid")
                .style("border-left-width", 2 + "px")
                .style("border-right-style", "solid")
                .style("border-right-width", 2 + "px")
                .style("left",  event.pageX + "px")
                .style("top", event.pageY - 20 + "px");
            svg.on("mousemove", function(event) {
                wildBarDiv
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            });         
            })
        .on("mouseout", function(d) {
            wildBarDiv.style("opacity", 0);
        })
}
