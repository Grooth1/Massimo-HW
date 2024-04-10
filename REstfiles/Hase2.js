var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

    function abc() {
    let rows = 7;
    let cols = 7;
    let currentRow = 1;
    let currentCol = 1;

   
   

    var intervalId = setInterval(() => {
        bunny.style.gridColumnStart = currentCol;
        bunny.style.gridRowStart = currentRow;
        
        if (currentCol < cols) {
            currentCol++;
        } else {
            currentCol = 1;
            currentRow++;
        }

        // Check if bunny has reached the end
        if (currentRow > rows) {
            clearInterval(intervalId);  // Clear the interval
           
        }
    }, 500);
}

getGoingButton.addEventListener("click", moveBunny);

