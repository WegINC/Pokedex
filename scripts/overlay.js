async function toggleOverlay(index) {
    loadingContent();
    let overlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
    overlayRef.innerHTML = await overlayTemplate(pokemonInfo, index);
    let typesPicture = `typesPicture${index}`;
    for (let index = 0; index < pokemonInfo.types.length; index++) {
      let typeInfo = await fetchPokemonInfo(pokemonInfo.types[index].type.url);
      let typeId = typeInfo.id;
      let typesPictureRef = document.getElementById(typesPicture);
      typesPictureRef.innerHTML += await getTypeImg(typeId);
    }
    await mainInfo(index);
    disableLoadingContent();
  }
function loadingContent() {
    let loadingRef = document.getElementById("loading");
    loadingRef.classList.add("overlay");
  
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.add("d-none");
  
    loadingRef.innerHTML = templateLoading();
  }

  function disableLoadingContent() {
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML = "";
    loadingRef.classList.remove("overlay");
  
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.remove("d-none");
  }
  
  async function fetchPokemonInfo(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
  }
  
  function closeOverlay() {
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.toggle("d-none");
    let bodyRef = document.getElementById("body");
    bodyRef.classList.remove("overflowHidden");
  }
  
  async function getOverlayForFilteredPokemon(index) {
    loadingContent();
    let overlayRef = document.getElementById("overlay");
    let filteredPokemonDetails = await fetchPokemonInfo(currentNames[index].url);
    overlayRef.innerHTML = overlayFilterTemplate(filteredPokemonDetails, index);
    let typesPicture = `typesPicture${index}`;
    for (let index = 0; index < filteredPokemonDetails.types.length; index++) {
      let typeInfo = await fetchPokemonInfo(filteredPokemonDetails.types[index].type.url);
      let typeId = typeInfo.id;
      let typesPictureRef = document.getElementById(typesPicture);
      typesPictureRef.innerHTML += await getTypeImg(typeId);
    }
    stopScroll();
    await mainInfoAboutFiltered(index);
    disableLoadingContent();
  }
  
  function stopScroll(){
    let bodyRef = document.getElementById("body");
    bodyRef.classList.add("overflowHidden");
    let mainInfoRef = document.getElementById("mainInfo");
    mainInfoRef.classList.add("active");
  }