var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");
var gridColumns = 7; 
var currentPosition = 0; 
var gridRow = 7;
function hop() {
    
    
    currentPosition = (currentPosition + 1) % gridColumns;
    

    bunny.style.gridColumn = currentPosition + 1; 
    if (currentPosition == gridColumns) {
         

    }
}
var hopInterval = setInterval(hop, 1000); 