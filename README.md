# Extra Credit Homework: Linking Charts and Adding Interactivity

The purpose of this homework is to give you practice interactively building and linking two visualizations together in D3. By the end of this assignment you should be able to:

- Preprocess Data in a language of your choice (preferably Python)
- Visualize multiple attributes of dataset in a bubble plot
- Dynamically update charts based on user interactions
- Add an interactive tooltip for both graphs

The screenshot below shows an example of what your finished interface will look like.

![imgs/interface.png](imgs/interface.png)

## Overview

The starter code for this assignment consists of two divs on the `index.html` page. Each div should be appended with an svg for a different plot. The first plot is a bubble chart that depicts National Parks in the United States by latitude and longitude. You 
are also expected to make a channel based on area and have an appropriate legend for the plot.
The user can select any park in this graph and there should be some feedback that a park is being considered for selection on hover.

Clicking a bubble will create a bar graph in the bottom div. In the bar graph, you are supposed to display the count of unique species of wildlife/vegetation categories in the species.csv for that particular bubble.

Since the graphs will be difficult to read exact values of Park area and count of species, you are also expected to show important details regarding both of them to help with graph readability.


## Data Description

The `parks.csv` file consists of a list of National Parks in the USA and the `species.csv` consists of a list of species in each park. Processing these two csvs will give you the required data to plot the required graphs. An important part of Data Visualisation is Data Processing. You are not always provided with the required data in a suitable manner. Sometimes, you will need to alter or combine the datasets to get the required data to plot the graphs.  

## To complete the assignment

- Clone this code template to your local machine.
- Start a local server and open the `index.html` page.
- Modify the given code according to the instructions below to achieve the requested interface.
- Commit and push the code back to this repository to submit it.

## Step 0: Starting code

When you first run the page, you should see the empty interface. Add your name and email to the top. A separate JS file is provided to you and if you want to, you can write the javascript code in the `index.html` file itself. However, this is not a good industry practice so I would suggest to use the `/js/main.js` file to hold your javascript code.

## Step 1: Processing the data

A very important task to complete before starting any visualisation is to analyze the data and make sure you have enough information to plot your graphs. Sometimes, you will need to merge data from different csv files or process data within the same csv file to get additional derived information.
You are provided a `/dataManipulation` folder. You can write some code here to give you the required information for both graphs.

| 🔍 **Hint:** Make sure your dataset is in the correct form when interacting with the bubble plot. Note that you require the count of unique categories of species (example: Mammal, Bird etc).

// DONE TILL HERE
## Step 2: Displaying a bubble plot 

When the page first loads, all three panels should be blank.
When the user enters a set of text in the top panel and then clicks on the `Submit` button, you should display a treemap that shows the distrubution of grammar characters from the `textarea` (i.e., the vowel counts, the consonant counts, and the punctuation counts in the entered text).

- You'll want to first read the entered text from the `textarea` and store it in a set of one or more data structures. Every time the submit button is pressed, you'll need to clear and recreate these (and re-display the treemap).
- Your treemap should be centered inside the `#treemap_div` svg. You may choose the margin around the chart, but make it doesn't go outside of the `svg`'s bounds, and that it's not too small.
- Choose a categorical d3 color scale for this chart by picking a color scale from [https://github.com/d3/d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) or creating your own manual one. All vowels will be one color, consonants another, and puncutations a third.
- Similar to what's shown in the treemap, the rectangles in each group should be organized together (e.g., all vowels together). There are various ways to create these hierarchies; for my code, I used this [D3.js Graph Gallery tutorial](https://d3-graph-gallery.com/graph/treemap_custom.html) as a reference (make sure you refernece the D3 v6 code, which is similar to v7, instead of the v4 code), and you may also find it beneficial (you can play around with the treemap paddings to figure out how to do the spacings correctly).
- Give the rectangles in this chart a 1 pixel black border (i.e., `stroke-width=1`), and add a small padding/margin between the rectangles.

| 🔍 **Hint:** Make sure your dataset is in the correct form when creating the treemap. The D3 Graph Gallery tutorial, for example, links to a JSON file that shows a correct hierarchical/nested dataset that is suitable for the `d3.treemap()` funcion.


![imgs/hover.gif](imgs/tooltip_treemap.gif)

## Step 2: Displaying a Sankey chart

When the user clicks on a rectangle in the treemap, draw a Sankey diagram in the bottom right panel. Your design should look similar to what is in the screenshots. The chart should be centered in the panel (with reasonable margins, similar to the screenshots), with nodes sized based on the counts of each character.

- The node rectangles in the Sankey diagram should be the same colors as the rectangles in the treemap. In my screenshots, I put a bit of spacing/padding between the rectangles (i.e., vertical spacing between the rectangles in the left column), and added a small rounding to the rectangles. You should give the bars a 1 pixel thick black border.
- If the user clicks on a different rectangle in the treemap, re-load the Sankey diagram for the selected character. When you do this, you'll need to build an appropriate dataset: the left column will show the counts of characters that occur immediately before that character (e.g., in the top screenshot on this page, `a` is selected, and the left column shows `la`, `ma`, etc.). The middle column sizes the `a` character based on the number of times it appears in the submitted text, and the right column shows characters immediately after `a` (e.g., `am`, `ad`, etc.). The ordering for nodes in the left/right columns is up to you (I'm using the ordering outputted by D3's `sankey` library).
- If the user clicks the `submit` text button in the top panel (thus submitting a new set of text, and re-loading the treemap), clear the Sankey diagram (make this a blank panel).
- You should also update the text at the top of this panel whenever a Sasnkey chart is loaded/cleared. When no chart is shown, the text should say `Character flow for ...`. When a character is selected, it should say `Character flow for 'char'`, where `char` is the selected character.

| 🔍 **Hint:** D3 does not contain a `sankey` function in its base library, so you'll need to import one. There are several libraries out there; for my demo code, I used the `d3-sankey.min.js` library linked here: [Sankey Diagram with D3 v7
](https://gist.github.com/d3noob/31665aced416f27abca4fa46f5f4b568). Similar to the treemap above, pay careful attention with building your dataset so it runs correctly in the Sankey algorithm you use.

![imgs/hover.gif](imgs/click_treemap.gif)

## Step 3: Add a hover tooltip to the two charts


Finally, add a tooltip to the two charts. When the user hovers over a rectangle in the treemap, display the name of the hovered character and the count for that character. When a user hovers over a rectangle in the Sankey diagram, show an appropriate tooltip:

- Left column: `Character 'char' flows into 'selected char' COUNT times.`
- Middle column: `Character 'selected char' appears COUNT times.`
- Right column: `Character 'selected char' flows into 'char' COUNT times.`

You can see the correct functionality in the GIF above.

The tooltip should be styled similar to the GIF (e.g., white background, black rounded border) and smoothly follow the user's mouse as it moves along the rectangle, and disappear when it's no longer over the rectangle. You'll want to use mouse events to control this functionality (`mouseover`, `mousemove`, `mouseout`). 

| 🔍 **Hint:** There are multiple ways to implement tooltips. One option is defining a div that's hidden unless you are hovering over a bar; when that happens, you populate the div with the necessary info, change its display to visible, and move it to the appropriate position on the so it follows the mouse's x/y position on the page. See  this page which for an example: [https://bl.ocks.org/d3noob/97e51c5be17291f79a27705cef827da2](https://bl.ocks.org/d3noob/97e51c5be17291f79a27705cef827da2).

| 🔍 **Hint:** When you mouse over a rectangle, you want to select the currently hovered data point. Inside your `mouseover`/`mousemove`/`mouseout` functions, you can have two parameters like so: `.on('mouseover', function(d, i) { ...})`. Use the Dev Tools to see what the `d` and `i` objects are, and what properties they contain, as a way to figure out how to reference the data item that is currently part of the event (i.e., that corresponds to the rectangle).

## Extra Credit

You can receive up to four extra credit points for this assignment. Each bullet point is worth up to two points (depending on quality  of implementation).

- Implement linked highlighting between the treemap and Sankey chart. For example, when a rectangle in the treemap is hovered over, highlight the rectangle in the treemap and in the Sankey diagram. For example, you could make the border a little thicker and change its stroke color to an easily visible highlight color to do this. Likewise, when a user hovers over a rectangle in the Sankey diagram, highlight all other rectangles in the Sankey and treemap that contain that character.
- Extend the linked highlighting to also highlight characters in the `textarea`. In other words, when you hover on a rectangle in the treemap or Sankey, highlight instances of that character in the text box. Likewise, think about how to smartly implement this in the Sankey chart: do you want to highlight _all_ instances of a character, or only ones that are part of the Sankey's currently shown chart? Also consider color: what color should you use to highlight the characters in the text box? If your color map uses very saturated colors, you might want to use a lighter shade (or a shade with partial opacity) to make it easy to still read the words in the text box. Note that the "base" `textarea` does not support highlighting individual characters, so you'll have to figure out a creative way to accomplish this, either by swapping out the `textarea` for different HTML elements (while maintaining the look and feel), or some other solution ([like this](https://codersblock.com/blog/highlight-text-inside-a-textarea/)). Note that I haven't tested this link out, so I am not sure if will work! :-)

## Grading

This assignment is worth 10 points.

- Step 0 is worth 1 point
- Step 1 is worth 3 points
- Step 2 is worth 3 points
- Step 3 is worth 3 points
- The Extra Credit is worth up to 4 bonus points