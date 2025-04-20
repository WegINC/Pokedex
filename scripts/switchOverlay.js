async function nextPic() {
  loadingSwitchContent();

  if (currentOverlayIndex < pokemonsRender.length - 1) {
    currentOverlayIndex++;
  } else {
    currentOverlayIndex = 0;
  }

  await getNextElement(currentOverlayIndex);
  await mainInfo(currentOverlayIndex);

  disableLoadingSwitchContent();
}

function updateOverlayContent(pokemonInfo) {
  const headInfo = document.getElementById("headInfo");
  if (headInfo) {
    headInfo.innerHTML = `
      <span class="idColor">#${pokemonInfo.id}</span>
      <span class="capitalize">${pokemonInfo.name}</span>
    `;
  }

  const image = document.querySelector(".loadedImg");
  if (image) {
    image.src = pokemonInfo.sprites.other.home.front_default;
  }

  const bg = document.querySelector(".overlayBgWidth");
  if (bg) {
    bg.className = `overlayBgWidth ${pokemonInfo.types[0].type.name}`;
  }

  const types = document.getElementById("typesPicture");
  if (types) {
    types.innerHTML = "";
    pokemonInfo.types.forEach(async (type) => {
      const typeInfo = await fetchPokemonInfo(type.type.url);
      const typeId = typeInfo.id;
      types.innerHTML += await getTypeImg(typeId);
    });
  }

  const info = document.getElementById("moreAboutPokemon");
  if (info) info.innerHTML = "";

  const extra = document.getElementById("loadMoreAboutPokemon");
  if (extra) extra.innerHTML = "";
}

async function getInfoType(pokemonInfoTypes) {
  const typesPictureRef = document.getElementById("typesPicture");
  if (!typesPictureRef) {
    console.warn("⚠️ typesPicture nicht im DOM gefunden – übersprungen");
    return;
  }

  for (let i = 0; i < pokemonInfoTypes.length; i++) {
    const typeInfo = await fetchPokemonInfo(pokemonInfoTypes[i].type.url);
    const typeId = typeInfo.id;
    typesPictureRef.innerHTML += await getTypeImg(typeId);
  }
}

async function prevPic() {
  loadingSwitchContent();

  if (currentOverlayIndex === 0) {
    currentOverlayIndex = pokemonsRender.length - 1;
  } else {
    currentOverlayIndex--;
  }

  await getPrevElement(currentOverlayIndex);
  await mainInfo(currentOverlayIndex);

  disableLoadingSwitchContent();
}

async function getFirstElementOfArray(index) {
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
    updateOverlayContent(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
    
}

async function getNextElement(index) {
  const pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
  updateOverlayContent(pokemonInfo);
  await mainInfo(index);
}

async function getPrevElement(index) {
  const pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
  updateOverlayContent(pokemonInfo, index);

  requestAnimationFrame(() => {
    getInfoType(pokemonInfo.types);
  });
}

async function nextPicFilter(index){
    let contentOverlayRef = document.getElementById("overlay");
    loadingSwitchContent();
    if(index < currentNames.length-1){
        index++;
        await getNextElementForFilteredPokemon(index);
    }else if(index = currentNames.length){
        index = 0;
        await getFirstElementOfArrayForFilteredPokemon(index);
    }
      await mainInfoAboutFiltered(index);
      disableLoadingSwitchContent();
}

async function getNextElementForFilteredPokemon(index) {
    let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
    contentOverlayRef.innerHTML = overlayFilterTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

async function getFirstElementOfArrayForFilteredPokemon(index) {
    let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
    contentOverlayRef.innerHTML = overlayFilterTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

async function prevPicFilter(index){
    loadingSwitchContent();
    if(index == 0){
        index = currentNames.length-1;
        await getFirstElementOfArrayForFilteredPokemon(index);
    }else if(index <= currentNames.length){
        index--;
        await getPrevElementForFilter(index);
    }
      await mainInfoAboutFiltered(index);
      disableLoadingSwitchContent();
}

async function getPrevElementForFilter(index) {
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
    contentOverlayRef.innerHTML = overlayFilterTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

function loadingSwitchContent(){
    let loadingRef = document.getElementById("loading");
    loadingRef.classList.add("overlay");
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.add("d-none");
    loadingRef.innerHTML = templateLoading();
  }

function disableLoadingSwitchContent(){
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML="";
    loadingRef.classList.remove("overlay");
    let contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.classList.remove("d-none");
  }