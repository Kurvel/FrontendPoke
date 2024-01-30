let Pokemon = document.getElementById("Pokemon");
let pokemonList = document.getElementById("pokemonList");
let pokemonInfo = document.getElementById("pokemonInfo");
let pokemonAbilities = document.getElementById("pokemonAbilities");


function fetchPokemons(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => printPokemons(data.results));
        
}

function printPokemons(pokemons) {
    // console.log(pokemons);
    pokemonList.innerHTML = "";
    pokemons.forEach(pokemon => {
        let li = document.createElement("li");
        li.innerText = pokemon.name;

        li.addEventListener("click", () => {
            fetchPokemonInfo(pokemon);
        });

        pokemonList.appendChild(li);
    });
    
}

function fetchPokemonInfo(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
    .then(res => res.json())
    .then(pokemonData => printPokemonInfo(pokemonData))
}

function printPokemonInfo(pokemonData) {
    pokemonInfo.innerHTML = "";
    console.log(pokemonData);
     

    let pokemonDiv = document.createElement("div");
    let pokemonName = document.createElement("h2");
    pokemonName.innerText = "Name: " + pokemonData.name;
    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "weight: " + pokemonData.weight;

    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "height: " + pokemonData.height;
    
    

    let pokemonSprite = document.createElement("img");
    pokemonSprite.style.width = "200px";
    pokemonSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
    
    

    pokemonData.abilities.forEach(ability => {
        //console.log(ability.ability.name);
        let abilityLi = document.createElement("li");
        abilityLi.innerText = "Ability: " + ability.ability.name;
        
        pokemonAbilities.appendChild(abilityLi);
    });

    


    pokemonDiv.append(pokemonName, pokemonSprite, pokemonWeight, pokemonHeight);
    pokemonInfo.appendChild(pokemonDiv);

}

fetchPokemons("https://pokeapi.co/api/v2/pokemon/")