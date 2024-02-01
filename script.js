let pokemon = document.getElementById("pokemon");
let pokemonList = document.getElementById("pokemonList");
let pokemonInfo = document.getElementById("pokemonInfo");
let pokemonAbilities = document.getElementById("pokemonAbilities");
let pokiedexBtn = document.getElementById("pokiedexBtn");

let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
let backendPokiedexUrl = "http://localhost:8080/pokemons";

function fetchPokemons(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => printPokemons(data.results));
}

function fetchBackend(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => printBackend(data));
}

function searchPokemon() {
  let searchInput = document.getElementById("searchInput").value;
  console.log("search", searchInput);
  let searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
  fetch(searchUrl)
    .then((res) => res.json())
    .then((data) => {
      let searchArray = [data];
      console.log(searchArray);
      printPokemons(searchArray);
    });

}
function start() {
  fetchPokemons(pokemonUrl);
}

function printBackend(backendData) {
  pokemonList.innerHTML = "";
  pokemonInfo.innerHTML = "";
  pokemonAbilities.innerHTML = "";

  let backendList = backendData;
  let pokemonArray = [];
  console.log(backendList);
  backendList.map((pokemonId) => {
    // console.log(pokemonId.id);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.pokemonId}/`)
      .then((res) => res.json())
      .then((pokemonData) => {
        pokemonArray = [pokemonData];
        
        pokemonArray.map((pokemon) => {
          let li = document.createElement("li");
          li.innerText = pokemon.name;

          li.addEventListener("click", () => {
            fetchPokemonInfo(pokemon);
          });

          let deleteBtn = document.createElement("button");
          deleteBtn.innerText = "delete";

          let p = document.createElement("p");
          p.innerText = pokemonId.notice;
          let inputNotice = document.createElement("input");

          let inputNoticeBtn = document.createElement("button");
          inputNoticeBtn.innerText = "Lägg till/ändra";

          deleteBtn.addEventListener("click", () => {
            console.log("Radera: ", pokemonId.pokemonId);
            fetch(
              "http://localhost:8080/pokemon?pokemonId=" + pokemonId.pokemonId,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log("delete: ", data);
                fetchBackend(backendPokiedexUrl);
              });
          });
          inputNoticeBtn.addEventListener("click", () => {
            console.log("Notis: ", inputNotice.value);
            fetch("http://localhost:8080/pokemon?pokemonId=" + pokemonData.id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ notice: inputNotice.value }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("notice: ", data);
                fetchBackend(backendPokiedexUrl);
              });
          });

          pokemonList.append(li, deleteBtn, p, inputNotice, inputNoticeBtn);
        });
      });
  });
}

pokiedexBtn.addEventListener("click", function () {
  pokemonList.innerHTML = "";
  pokemonInfo.innerHTML = "";
  pokemonAbilities.innerHTML = "";
  fetchBackend(backendPokiedexUrl);
});

function printPokemons(pokemons) {
  //console.log("Search: ", pokemons);
  pokemonList.innerHTML = "";
  pokemons.map((pokemon) => {
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
    .then((res) => res.json())
    .then((pokemonData) => printPokemonInfo(pokemonData));
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

  let addToPokiedexBtn = document.createElement("button");
  addToPokiedexBtn.innerText = "add to pokedex";

  let inputNotice = document.createElement("input");

  addToPokiedexBtn.addEventListener("click", () => {
    console.log("value: ", inputNotice.value);
    console.log("poke: ", pokemonData.id);
    fetch("http://localhost:8080/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokemonId: pokemonData.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("AddPokiedata: ", data);
        fetch("http://localhost:8080/pokemon?pokemonId=" + pokemonData.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notice: inputNotice.value }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("notice: ", data);
          });
      });
      
  });

  let pokemonSprite = document.createElement("img");
  pokemonSprite.style.width = "200px";
  pokemonSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;

  pokemonData.abilities.forEach((ability) => {
    //console.log(ability.ability.name);
    let abilityLi = document.createElement("li");
    abilityLi.innerText = "Ability: " + ability.ability.name;

    pokemonAbilities.appendChild(abilityLi);
  });

  pokemonDiv.append(
    pokemonName,
    pokemonSprite,
    pokemonWeight,
    pokemonHeight,
    addToPokiedexBtn,
    inputNotice
  );
  pokemonInfo.appendChild(pokemonDiv);
}

fetchPokemons(pokemonUrl);
