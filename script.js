let Pokemon = document.getElementById("Pokemon");
let pokemonList = document.getElementById("pokemonList");
let pokemonInfo = document.getElementById("pokemonInfo");
let pokemonAbilities = document.getElementById("pokemonAbilities");
let pokiedexBtn = document.getElementById("pokiedexBtn");

let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/"
let backendPokiedexUrl = "http://localhost:8080/pokemons"


function fetchPokemons(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => printPokemons(data.results));
        
}

function fetchBackend(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => printBackend(data)); 
}

fetchBackend(backendPokiedexUrl);

function printBackend(backendData) {
    
    let backendList = backendData;
    console.log(backendList);
    backendList.map(pokemonId => {
        console.log(pokemonId.id);

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.id}/`)
       .then(res => res.json())
       .then(pokemonData => console.log(pokemonData.name))
        
    })
}

 // pokemonList.innerHTML = "";
    // let fetchPokemonUrl = fetch(pokemonUrl).then(res => res.json()); 
    // let fetchBackendPokiedexUrl = fetch(backendPokiedexUrl).then(res => res.json());
    // Promise.all([fetchPokemonUrl, fetchBackendPokiedexUrl]).then((data) => {
        
    //     let pokeApis = data[0].results;
    //     console.log(pokeApis);
    //     let pokeBackend = data[1];
    //     console.log(pokeBackend);
    
    //     pokeApis.map(pokeApi => {
    //         let li = document.createElement("li");
    //         li.innerText = pokeApi.url;
    //         pokemonList.appendChild(li);
    //     })
    // })




pokiedexBtn.addEventListener("click", function () {
   
    
        
    });


function printPokemons(pokemons) {
     console.log(pokemons);
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
    pokemonAbilities.innerHTML = "";
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

fetchPokemons(pokemonUrl)
