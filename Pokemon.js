
const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
const game = document.getElementById('game');

let firstPick;
let isPaused = true;



const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};








const loadPokemon = async () => {
    const randomIds = new Set();
    while (randomIds.size < 8) {
        const randomNumber = Math.ceil(Math.random() * 150);
        randomIds.add(randomNumber);
    }
    const pokePromises = [...randomIds].map(id => fetch(pokeAPIBaseUrl + id))
    const results = await Promise.all(pokePromises);
    return await Promise.all(results.map(res => res.json()));
}


let trys = 0;
let highscore = 0;
let matches = 0;
let currenttries = 0;
let besttries;
const displayPokemon = (pokemon) => {
    pokemon.sort(_ => Math.random() - 0.5);
    const pokemonHTML = pokemon.map(pokemon => {
        const type = pokemon.types[0]?.type?.name;
        const color = colors[type] || '#F5F5F5';
        return `
          <div class="card" onclick="clickCard(event)" data-pokename="${pokemon.name}" style="background-color:${color};">
            <div class="front ">
            </div>
            <div class="back rotated" style="background-color:${color};">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"  />
            <h2>${pokemon.name}</h2>
            </div>
        </div>
    `}).join('');
    game.innerHTML = pokemonHTML;
}



const clickCard = (e) => {
    const pokemonCard = e.currentTarget;
    const [front, back] = getFrontAndBackFromCard(pokemonCard)
    if (front.classList.contains("rotated") || isPaused) {
        return;
    }
    isPaused = true;
    rotateElements([front, back]);
    if (!firstPick) {
        firstPick = pokemonCard;
        isPaused = false;
    }
    else {
        const secondPokemonName = pokemonCard.dataset.pokename;
        const firstPokemonName = firstPick.dataset.pokename;
        if (firstPokemonName !== secondPokemonName) {
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack]);
                firstPick = null;
                isPaused = false;
            }, 500)
            currenttries++;
            if (currenttries === 20) {
                alert("Zu viele Versuche")
                resetGame()
            }
        } else {
            matches++;
            currenttries++;
            if (matches === 8) {
                alert("WINNER");
               
                    document.getElementById("Versuche").innerText = currenttries
                
            }
            if (currenttries === 20) {
                alert("Zu viele Versuche")
                resetGame()
            }

            firstPick = null;
            isPaused = false;
            showhighscore();	
        }
    }

}
const showhighscore = (currentscore) =>
{
    if (currenttries < besttries)
    {
        besttries = currenttries;
    }
    if (matches < 9) {
        
        let currentscore = matches * 500;
        

        if (currentscore > highscore) {
            highscore = currentscore
        }

        console.log(`New High Score: ${highscore}`);
        document.getElementById("Currentscore").innerText=currentscore
        document.getElementById("Highscore").innerText=highscore
    }
    if (matches == 0)
    {
        currentscore = 0;
    }
    if (currentscore == 4000)

    {
        alert("Gratuliere du hast alle Pokepaare gefunden")
    }
    

    }


const getFrontAndBackFromCard = (card) => {
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    return [front, back]
}

const rotateElements = (elements) => {
    if (typeof elements !== 'object' || !elements.length) return;
    elements.forEach(element => element.classList.toggle('rotated'));
}

const resetGame = async () => {
    game.innerHTML = '';
    isPaused = true;
    firstPick = null;
    matches = 0;
    currenttries = 0;
    


    setTimeout(async () => {
        const loadedPokemon = await loadPokemon();
        displayPokemon([...loadedPokemon, ...loadedPokemon]);
        isPaused = false;
    }, 200)
}


resetGame();


