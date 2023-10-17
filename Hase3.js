var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");


function abc2()
{

    var columns = 1;
    var rows = 1;
    var Richtung = 1;


    const Inter = setTimeout(function abc2(){
    
        bunny.style.gridColumnStart = columns;
        bunny.style.gridRowStart = rows;
            
            if (columns == 10 && rows % 2 == 1)
            {
                rows++;
                Richtung = -1;
            }

            else if(columns = 1 && rows % 2 == 0)
            {
                rows++;
                Richtung = 1;
            }
            else {
                a += Richtung;
            }
    },500)
}