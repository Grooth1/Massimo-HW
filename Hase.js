var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

function abc() {
    let a = 1;
    let b = 1;
    let direction = 1; // 1 for moving right, -1 for moving left
    const avs = setInterval(function () {
        bunny.style.gridColumnStart = a;
        bunny.style.gridRowStart = b;

        if (b ===  7 && a === 7) {
            clearInterval(avs);
        }
        if (a === 10 && b%2==1)  {
            b++;
            direction = -1;
            
        } else if (a === 1 && b % 2 ===0) {
            b++;
            direction = 1;
           
        } else {
            a += direction;    
        }

    }, 400);
    
}