function getTemplateOfPokemon(index) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML += `<div id="pokemon${index + 1}" class="pokemon" >
                              <div class="${pokemonsRender[index].types[0].type.name} bgDesign">
                                  <img onclick="toggleOverlay(${index})" id="pokemonImg${index + 1}" src="${pokemonsRender[index].image}">
                              </div>
                              <div class="cardInfoStyle">
                              <span class="idColor">#${pokemonsRender[index].id}</span>
                              <span class ="capitalize"><b>${pokemonsRender[index].name}</b></span>
                              <div id="type${index + 1}"></div>
                              </div>
                              </div>`;
  }
  
  function getTemplateOfType(typeIndex) {
    return `<span class="${typeIndex.type.name} styleOfType mgRight">${typeIndex.type.name}</span>`;
  }
  
  async function getTemplateOfFilteredPokemon(index, pokemonDetails) {
    return await `<div id="pokemon${index + 1}" class="pokemon" >
                      <div class="${pokemonDetails.types[0].type.name} bgDesign">
                        <img  onclick="getOverlayForFilteredPokemon(${index})"  onclick="toggleOverlay(${index})" id="pokemonImg${index + 1}" src="${pokemonDetails.sprites.other.home.front_default}">
                      </div>  
                      <div class="cardInfoStyle">
                        <span class="idColor">#${pokemonDetails.id}</span>
                        <span class ="capitalize"><b>${pokemonDetails.name}</b></span>
                        <div id="type${index + 1}"></div>
                      </div>
                    </div>`;
  }
  
  function overlayTemplate(pokemonInfo, index) {
    return `<div id="contentOverlay" onclick="pauseOverlay(event)" class="bgOfInfo">
                <div class="mbTopBottom">
                <img onclick="prevPic(${index})" class="arrowNext" src="./assets/icons/arrowLeft.png">
                  <div class="headInfo">
                    <span class="idColor">#${pokemonInfo.id}</span>
                    <span class="capitalize">${pokemonInfo.name}</span>
                  </div>    
                <img onclick="nextPic(${index})" class="arrowNext" src="./assets/icons/arrowRight.png">
                </div>
                      <div class="${pokemonInfo.types[0].type.name} overlayBgWidth">
                      <img class="loadedImg" src="${pokemonInfo.sprites.other.home.front_default}" alt="">
                      </div>
                 <div id="typesPicture${index}">
                 </div>
                <div class="options">
                  <span onclick="mainInfo(${index})" class="position" id="mainInfo">main</span>
                  <span onclick ="statsInfo(${index})" class="position" id="statsInfo">stats</span>
                  <span onclick ="evoChainInfo(${index})" class="position" id="evoChainInfo">evo chain</span>
                </div>
                <div id="moreAboutPokemon" class="mainInfo">
                </div>
                <div id="loadMoreAboutPokemon" class="mainInfo column">
            </div>
            </div>`;
  }
  
  function overlayFilterTemplate(filteredPokemonDetails, index) {
    return `<div onclick="pauseOverlay(event)" class="bgOfInfo">
                <div class="mbTopBottom">
                <img onclick="prevPicFilter(${index})" class="arrowNext" src="./assets/icons/arrowLeft.png">
                <div class="headInfo">
                  <span class="idColor">#${filteredPokemonDetails.id}</span>
                  <span class ="capitalize">${filteredPokemonDetails.name}</span>
                  </div>    
                <img onclick="nextPicFilter(${index})" class="arrowNext" src="./assets/icons/arrowRight.png">
                </div>
                <div class="${filteredPokemonDetails.types[0].type.name} overlayBgWidth">
                     <img class="loadedImg" src="${filteredPokemonDetails.sprites.other.home.front_default}" alt="">
                </div>
                 <div id="typesPicture${index}">
                 </div>
            <div class="options">
              <span onclick ="mainInfoAboutFiltered(${index})" class="position" id="mainInfo">main</span>
              <span onclick ="statsInfoAboutFiltered(${index})" class="position" id="statsInfo">stats</span>
              <span onclick ="evoChainInfoAboutFiltered(${index})" class="position" id="evoChainInfo">evo chain</span>
            </div>
            <div id="moreAboutPokemon" class="mainInfo">
            </div>
            <div id="loadMoreAboutPokemon" class="mainInfo column">
            </div>
        </div>`;
  }
  
  function getMainInfoTemplate(pokemonInfo) {
    return ` <table>
              <tbody>
              <tr>
                <td>Height :</td>
                <td>${pokemonInfo.height / 10} m</td>
              </tr>
              <tr>
                <td>Weight :</td>
                <td>${pokemonInfo.weight / 10} kg</td>
              </tr>
              <tr>
                <td>Base experience :</td>
                <td>${pokemonInfo.base_experience}</td>
              </tr>
              <tr id="abilities">
                <td>Abilities :</td>
              </tr>
              </tbody>
            </table>`;
  }
  
  function getStatsInfoTemplate(infoStats) {
    return `<div class="svgData">
              <span>${infoStats.stat.name}</span>
                <svg class="svgInfo" width="200" height="16">
                  <rect x="0" y="0" width="200" height="16" fill="rgb(13, 18, 58)" stroke="#3B4CCA" stroke-width="2" str rx="8" />
                  <rect id="progress" x="3" y="3" width="${infoStats.base_stat}" height="10" fill="#5E99AE" rx="5" ></rect>
                </svg>
            </div>`;
  }
  
  function getEvoOfPokemon(pokemon){
    return `<div class="evoStyle">
    <img class="evoPics" src="${pokemon.sprites.other.home.front_default}">
    <span>${pokemon.name}</span></div>`
  }
  
  function getEvoOfPokemonWithArrow(pokemon){
    return `<div class="evoStyle">
            <div class="arrowPosition">
              <div class="arrowPosition">
                <img class="arrow" src="./assets/img/right-arrow.png">
              </div>
                <div class="mainInfoPosition">  
                  <img class="evoPics" src="${pokemon.sprites.other.home.front_default}">
                  <span>${pokemon.name}</span>
                </div>
            </div>
          </div>`
  }
  
  async function getTypeImg(typeId) {
    return await `<img class="typePics" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${typeId}.png">`;
  }
  
  function templateLoading(){
    return `<svg class="pokeball" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,50 A 40,40 0 0,1 90,50" fill="red" stroke="black" stroke-width="2" />
        <path d="M 10,50 A 40,40 0 0,0 90,50" fill="white" stroke="black" stroke-width="2" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="black" stroke-width="2" />
        <circle cx="50" cy="50" r="10" fill="white" stroke="black" stroke-width="2" />
        <circle cx="50" cy="50" r="6" fill="black" />
        <circle cx="50" cy="50" r="5" fill="white" />
    </svg>
    <span class="loadText">Pokédex lädt...</span>`
  }