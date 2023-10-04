var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

function abc() {
    let a = 1;
    let b = 1;
    let direction = 1; // 1 for moving right, -1 for moving left
    const avs = setInterval(function () {
        bunny.style.gridColumnStart = a;
        bunny.style.gridRowStart = b;
        if (a === 5 && b%2==1)  {
            b++;
            direction = -1;
            
        } else if (a === 1 && b % 2 ===0) {
            b++;
            direction = 1;
           
        } else {
            a += direction;    
        }
        
        if (b ===  5 && a === 5) {
            clearInterval(avs);
        }
    }, 400);
    
}