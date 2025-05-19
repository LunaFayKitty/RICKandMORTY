const container = document.getElementById("container");
const characterContainer = document.getElementById("characters");
const baseURL = "https://rickandmortyapi.com/api";
let previousPage = "";

function fetchEpisodes() {
  previousPage = "home";
  fetch(`${baseURL}/episode`)
    .then((response) => response.json())
    .then((data) => {
      showEpisodes(data.results);
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Episoden:", error)
    );
}

function showEpisodes(episodes) {
  container.innerHTML = "";
  episodes.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${episode.name}</h2>
      <div class="mb-2">${episode.episode}</div>
      <button class="button" onclick="showEpisodeDetails('${episode.url}')">Details</button>
    `;
    container.appendChild(card);
  });
  showBackButton("home");
}

function showEpisodeDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((episode) => {
      container.innerHTML = `
        <div>
          <h2 class="text-xl font-bold mb-2 text-white">${episode.name}</h2>
          <p class="text-white">Erstausstrahlung: ${episode.air_date}</p>
          <p class="text-white">Episode: ${episode.episode}</p>
        </div>
      `;

      characterContainer.innerHTML = "";
      episode.characters.forEach((characterUrl) => {
        fetch(characterUrl)
          .then((response) => response.json())
          .then((character) => {
            const charCard = document.createElement("div");
            charCard.className = "character-card";
            charCard.innerHTML = `
              <h4 class="text-md font-bold mb-3">${character.name}</h4>
              <div class="flex justify-center items-center">
                <img src="${character.image}" alt="${character.name}" class="w-200 h-auto rounded mb-2">
              </div>
            `;
            characterContainer.appendChild(charCard);
          })
          .catch((error) =>
            console.error("Fehler beim Abrufen der Charakterdetails:", error)
          );
      });

      characterContainer.classList.remove("hidden");
      showBackButton("episodes");
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Episoden-Details:", error)
    );
}

function fetchCharacters() {
  previousPage = "home";
  fetch(`${baseURL}/character`)
    .then((response) => response.json())
    .then((data) => {
      showCharacters(data.results);
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Charaktere:", error)
    );
}

function showCharacters(characters) {
  container.innerHTML = "";
  characters.forEach((character) => {
    const charCard = document.createElement("div");
    charCard.className = "character-card";
    charCard.innerHTML = `
      <h4 class="text-md font-bold mb-3">${character.name}</h4>
      <div class="flex justify-center items-center">
        <img src="${character.image}" alt="${character.name}" class="w-200 h-auto rounded mb-2">
      </div>
      <button class="button" onclick="showCharDetails('${character.url}')">Details</button>
    `;
    container.appendChild(charCard);
  });
  characterContainer.classList.add("hidden");
  showBackButton("home");
}

function showCharDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((character) => {
      container.innerHTML = `
        <div class="flex justify-start items-start flex-col">
          <h2 class="text-xl font-bold mb-2 text-white">${character.name}</h2>
          <div>
            <img src="${character.image}" alt="${character.name}" class="w-200 h-auto rounded mb-2">
          </div>
          <p class="text-white">Species: ${character.species}</p>
          <p class="text-white">Gender: ${character.gender}</p>
          <p class="text-white">Origin: ${character.origin.name}</p>
          <p class="text-white">Location: ${character.location.name}</p>
        </div>
      `;
      showBackButton("characters");
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Charakterdetails:", error)
    );
}

function fetchLocations() {
  previousPage = "home";
  fetch(`${baseURL}/location`)
    .then((response) => response.json())
    .then((data) => {
      showLocations(data.results);
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Lokationen:", error)
    );
}

function showLocations(locations) {
  container.innerHTML = "";
  locations.forEach((location) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${location.name}</h2>
      <div class="mb-2">Type: ${location.type}</div>
      <div class="mb-2">Dimension: ${location.dimension}</div>
      <button class="button" onclick="showLocationDetails('${location.url}')">Details</button>
    `;
    container.appendChild(card);
  });
  showBackButton("home");
}

function showLocationDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((location) => {
      container.innerHTML = `
        <div>
          <h2 class="text-xl font-bold mb-2 text-white">${location.name}</h2>
          <p class="text-white">Type: ${location.type}</p>
          <p class="text-white">Dimension: ${location.dimension}</p>
          <p class="text-white">Residents:</p>
        </div>
      `;

      characterContainer.innerHTML = "";
      location.residents.forEach((characterUrl) => {
        fetch(characterUrl)
          .then((response) => response.json())
          .then((character) => {
            const charCard = document.createElement("div");
            charCard.className = "character-card";
            charCard.innerHTML = `
              <h4 class="text-md font-bold mb-3">${character.name}</h4>
              <div class="flex justify-center items-center">
                <img src="${character.image}" alt="${character.name}" class="w-200 h-auto rounded mb-2">
              </div>
            `;
            characterContainer.appendChild(charCard);
          })
          .catch((error) =>
            console.error("Fehler beim Abrufen der Charakterdetails:", error)
          );
      });

      characterContainer.classList.remove("hidden");
      showBackButton("locations");
    })
    .catch((error) =>
      console.error("Fehler beim Abrufen der Location-Details:", error)
    );
}

function showBackButton(previousPageName) {
  previousPage = previousPageName;
  const backButton = document.getElementById("backButton");
  if (previousPageName !== "home") {
    backButton.classList.remove("hidden");
  } else {
    backButton.classList.add("hidden");
  }
}

function goBack() {
  switch (previousPage) {
    case "home":
      document.getElementById("backButton").classList.add("hidden");
      break;
    case "episodes":
      fetchEpisodes();
      break;
    case "characters":
      fetchCharacters();
      break;
    case "locations":
      fetchLocations();
      break;
    default:
      console.error("Unbekannte Seite:", previousPage);
  }
}
