const pokemonContainer = document.querySelector(".pokemon-container");
const btnRefresh = document.getElementById("btn-refresh");

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}

function fetchPokemons(number) {
  const randomNumbers = [];

  for (let i = 1; i <= number; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    randomNumbers.push(randomNumber);
    fetchPokemon(randomNumber);
  }
}

function createPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(name);
  card.appendChild(number);

  pokemonContainer.appendChild(card);
}

fetchPokemons(6);

btnRefresh.addEventListener("click", () => {
  const pokemonContainer = document.querySelector(".pokemon-container");
  const pokemonBlocks = document.querySelectorAll(".pokemon-block");
  pokemonBlocks.forEach((pokemonBlock) => {
    pokemonContainer.removeChild(pokemonBlock);
  });
  fetchPokemons(6);
});
