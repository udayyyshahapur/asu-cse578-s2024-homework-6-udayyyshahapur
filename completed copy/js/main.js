// Hint: This is a good place to declare your global variables

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
   // Hint: create or set your svg element inside this function
   // This will load your CSV file(s) and store them into arrays.

    Promise.all([d3.csv('data/parks.csv'), d3.csv('data/species.csv')])
        .then(function (values) {
            parks_data = values[0];
            species_data = values[1];

            // Hint: This is a good spot for the data wrangling if you are not processing your data into a new csv file
            drawBubblePlot(svg); 
        }
    );
});

// Use this function to draw the bubble chart
function drawBubblePlot() {
    console.log('trace:drawBubblePlot()');
}

// Use this function to draw your second chart on interaction with the first
function drawBarPlot(dataFromFirstPlot) {
    console.log('trace:drawBarPlot()');
}
