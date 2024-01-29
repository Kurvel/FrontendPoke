let Pokemon = document.getElementById("Pokemon");
let pokemonList = document.getElementById("pokemonList");


function fetchPokemons(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => printPokemons(data.results));
        
}

function printPokemons (pokemons) {
    console.log(pokemons);
    pokemonList.innerHTML = "";
    pokemons.forEach(pokemon => {
        let li = document.createElement("li");
        li.innerText = pokemon.name;

        li.addEventListener("click", () => {
            printPokemonInfo(pokemon);
        });

        pokemonList.appendChild(li);
    });
    
}

function printPokemonInfo(pokemon) {
    let pokemonInfo = document.getElementById("pokemonInfo");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
    .then(res => res.json())
    .then(data => console.log(data));

}

fetchPokemons("https://pokeapi.co/api/v2/pokemon/")