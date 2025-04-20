let debounceTimeOut = 0; 

function filterAndShowNames(filterWord){
    clearTimeout(debounceTimeOut);
    debounceTimeOut = setTimeout( ()=>{
        currentNames = pokemonsList.filter((pokemon) => pokemon.name.toLowerCase().includes(filterWord.toLowerCase())
    );
    if(filterWord.length >= 0){
         renderFilteredNames(filterWord);
    } 
    }, 300);
}

async function renderFilteredNames(filterWord){
    let contentRef = document.getElementById("content");
    contentRef.innerHTML="";
    if (filterWord.length < 3 || currentNames.length == 0){
        PAGINATION_START = 0;
        renderLoadedPokemons();
        enableLoadingMorePokemon();
        return;
    } else if (filterWord.length >= 3 && currentNames.length != 0 ){
        disableLoadingMorePokemon();
        for (let index = 0; index < currentNames.length; index++) {
            let pokemonDetails = await fetchPokemonInfo(currentNames[index].url);
            contentRef.innerHTML += await getTemplateOfFilteredPokemon(index, pokemonDetails);
            await renderFilteredTypes(index, pokemonDetails);
         }
    } 
}

function disableLoadingMorePokemon(){
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.add("d-none");
}

function enableLoadingMorePokemon(){
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.remove("d-none");
}

function renderFilteredTypes(index, pokemonDetails){
    let typeRef = `type${index+1}`;
    for (let index = 0; index < pokemonDetails.types.length; index++) {
      let typeIndex = pokemonDetails.types[index];
      let typeContentRef = document.getElementById(typeRef);
      typeContentRef.innerHTML += getTemplateOfType(typeIndex);
    }
  }

function renderLoadedPokemons(){
    for (let index = 0; index < pokemonsRender.length; index++) {
      getTemplateOfPokemon(index);
      renderTypes(index);
    }
  }