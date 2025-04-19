let pokemonsList = [];
let pokemonsRender = [];
let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
let PAGINATION_START = 0;
let PAGINATION_END = 20;

async function init() {
  showLoadingSpinner();
  let response = await loadPokemons();
  let pokemonsKeysArray = response.results;
  pokemonsList = pokemonsKeysArray;
  await renderPokemons();
  disableLoadingSpinner();
}

async function loadPokemons() {
  let response = await fetch(BASE_URL);
  let responseToJson = await response.json();
  return responseToJson;
}

 async function renderPokemons(){
  if (PAGINATION_END <= pokemonsList.length) {
    await countPokemon();
    enableBtn();
  } else if (PAGINATION_END >= pokemonsList.length) {
    await stopCount();
    enableBtn(); 
  }
}

async function countPokemon(){
  for (let index = PAGINATION_START; index < PAGINATION_END; index++) {
    let responseUrl = await fetchPokemonData(index+1);
    pokemonsRender.push(
      {
      name: pokemonsList[index].name,
      image : responseUrl.sprites.other.home.front_default,
      types : responseUrl.types,
      id : responseUrl.id,
      url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
      }
    );
    getTemplateOfPokemon(index);
    renderTypes(index);
  }
}

async function fetchPokemonData(index) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
  let responseToJson = await response.json();
  return responseToJson;
}

async function stopCount() {
    PAGINATION_END = pokemonsList.length;
    for (let index = PAGINATION_START; index < PAGINATION_END; index++) {
      let responseUrl = await fetchPokemonData(index+1);
      pokemonsRender.push(
        {
        name: pokemonsList[index].name,
        image : responseUrl.sprites.other.home.front_default,
        types : responseUrl.types,
        url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
        }
      );
      getTemplateOfPokemon(index);
      renderTypes(index);
    }
}

function renderTypes(index){
  let pokemon = pokemonsRender[index];
  let typeRef = `type${index+1}`;
  for (let index = 0; index < pokemon.types.length; index++) {
    let typeIndex = pokemon.types[index];
    let typeContentRef = document.getElementById(typeRef);
    typeContentRef.innerHTML += getTemplateOfType(typeIndex);
  }
}

async function loadMorePokemon() {
  loadingPokemon();
  disableBtn();
    PAGINATION_START = pokemonsRender.length;
    PAGINATION_END +=20;
  await renderPokemons();
  disableLoadingPokemon();
}

function disableBtn(){
  document.getElementById("loadBtn").disabled = true;
}

function enableBtn(){
  document.getElementById("loadBtn").disabled = false;
}

function pauseOverlay(event){
  event.stopPropagation(event);
}