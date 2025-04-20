async function nextPic(index) {
    const contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.innerHTML = "";
    loadingSwitchContent();
  
    if (index < pokemonsRender.length - 1) {
      index++;
      await getNextElement(index);
    } else if (index === pokemonsRender.length) {
      index = 0;
      await getFirstElementOfArray(index);
    }
  
    requestAnimationFrame(async () => {
      await mainInfo(index);
      disableLoadingSwitchContent();
    });
  }

  async function getNextElement(index) {
    const contentOverlayRef = document.getElementById("overlay");
    const pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
    contentOverlayRef.innerHTML = overlayTemplate(pokemonInfo, index);
  
    requestAnimationFrame(() => {
      getInfoType(pokemonInfo.types, index);
    });
  }

async function getInfoType(pokemonInfoTypes, index) {
    const typesPictureId = `typesPicture${index}`;
    const typesPictureRef = document.getElementById(typesPictureId);
  
    if (!typesPictureRef) {
      console.warn(`⚠️ Element '${typesPictureId}' nicht gefunden – getInfoType übersprungen`);
      return;
    }
  
    for (let i = 0; i < pokemonInfoTypes.length; i++) {
      const typeInfo = await fetchPokemonInfo(pokemonInfoTypes[i].type.url);
      const typeId = typeInfo.id;
      typesPictureRef.innerHTML += await getTypeImg(typeId);
    }
  }

async function prevPic(index){
    let contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.innerHTML="";
    loadingSwitchContent();
    if(index == 0){
        index = pokemonsRender.length-1;
        await getFirstElementOfArray(index);
    }else if(index <= pokemonsRender.length){
        index--;
        await getPrevElement(index);
    }
      await mainInfo(index);
      disableLoadingSwitchContent();
}

async function getFirstElementOfArray(index) {
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
    contentOverlayRef.innerHTML = overlayTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
    
}

async function getPrevElement(index) {
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
    contentOverlayRef.innerHTML = overlayTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

async function nextPicFilter(index){
    let contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.innerHTML="";
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
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
    contentOverlayRef.innerHTML = overlayFilterTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

async function getFirstElementOfArrayForFilteredPokemon(index) {
    let contentOverlayRef = document.getElementById("overlay");
    let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
    contentOverlayRef.innerHTML = overlayFilterTemplate(pokemonInfo, index);
    let pokemonInfoTypes = pokemonInfo.types;
    getInfoType(pokemonInfoTypes, index);
}

async function prevPicFilter(index){
    let contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.innerHTML="";
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