function showLoadingSpinner(){
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.add("d-none");
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML = templateLoading();
  }
  function disableLoadingSpinner(){
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML = "";
    loadingRef.classList.remove("loading");
    let contentRef = document.getElementById("content");
    contentRef.classList.toggle("d-none");
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.remove("d-none");
  }

  function disableLoadingPokemon(){
    let contentRef = document.getElementById("content");
    contentRef.classList.remove("d-none");
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.remove("d-none");
    let loadingRef = document.getElementById("loading");
    loadingRef.classList.remove("loading");
    loadingRef.innerHTML = "";
  }

  function setLoadingHTML(show) {
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML = show ? templateLoading() : "";
    loadingRef.classList.toggle("loading", show);
  }
  
  function toggleVisibility(id, show) {
    let toggleRef = document.getElementById(id);
    if (!toggleRef) return;
    toggleRef.classList.toggle("d-none", show);
  }
  
  function toggleActivity(id, show) {
    let toggleRef = document.getElementById(id);
    if (!toggleRef) return;
    toggleRef.classList.toggle("active", show);
  }
  

  async function loadMorePokemon() {
    showPokeballLoadingScreen(); // 🟢 Zeige zentrierten Pokéball
    disableBtn();
    PAGINATION_START = pokemonsRender.length;
    PAGINATION_END += 20;
  
    await renderPokemons();
  
    hidePokeballLoadingScreen(); // 🔴 Verstecke ihn wieder
    enableBtn();
  }



  function loadMoreAboutPokemon(){
    let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
    moreAboutPokemonRef.classList.add("d-none");
    let loadMoreAboutPokemonRef = document.getElementById("loadMoreAboutPokemon");
    loadMoreAboutPokemonRef.innerHTML = templateLoading();
    loadMoreAboutPokemonRef.classList.remove("d-none");
  }

  function disableLoadMoreAboutPokemon(){
    let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
    moreAboutPokemonRef.classList.remove("d-none");
    let loadMoreAboutPokemonRef = document.getElementById("loadMoreAboutPokemon");
    loadMoreAboutPokemonRef.innerHTML="";
    loadMoreAboutPokemonRef.classList.add("d-none");
  }
  function showPokeballAnimation() {
    const pokeball = document.querySelector('.pokeball');
    const loadButton = document.getElementById('loadBtn');

    // Button ausblenden
    loadButton.style.display = 'none';

    // Pokéball anzeigen
    pokeball.style.display = 'block';

    // Nach 2 Sekunden Pokéball ausblenden und Button wieder einblenden
    setTimeout(() => {
      pokeball.style.display = 'none';
      loadButton.style.display = 'block';
    }, 20000);

    // Optional: Hier kannst du deine "mehr Pokémon laden"-Logik reinpacken
  }
    function showPokeballLoadingScreen() {
    const loadingRef = document.getElementById('loading');
    loadingRef.classList.add('loading-screen');
    loadingRef.innerHTML = `<div class="pokeball"></div>`;
  }

  function hidePokeballLoadingScreen() {
    const loadingRef = document.getElementById('loading');
    loadingRef.innerHTML = '';
    loadingRef.classList.remove('loading-screen');
  }