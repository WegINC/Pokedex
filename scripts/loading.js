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

  function loadingPokemon(){
    let contentRef = document.getElementById("content");
    contentRef.classList.add("d-none");
    let loadBtnRef = document.getElementById("loadBtn");
    loadBtnRef.classList.add("d-none");
    let loadingRef = document.getElementById("loading");
    loadingRef.classList.add("loading");
    loadingRef.innerHTML = templateLoading();
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

  function goDown(){
    let contentRef = document.getElementById("content");
    window.scrollTo({
      top: contentRef.scrollHeight
    })
  }

  function loadingContent(){
    let bodyRef = document.getElementById("body");
    bodyRef.classList.add("overflowHidden");
    let loadingRef = document.getElementById("loading");
    loadingRef.classList.add("overlay");
    loadingRef.innerHTML = templateLoading();
  }

  function disableLoadingContent(){
    let loadingRef = document.getElementById("loading");
    loadingRef.innerHTML="";
    loadingRef.classList.remove("overlay");
    let contentOverlayRef = document.getElementById("overlay");
    contentOverlayRef.classList.remove("d-none");
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
  function loadMorePokemon() {
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
    }, 2000);

    // Optional: Hier kannst du deine "mehr Pokémon laden"-Logik reinpacken
  }