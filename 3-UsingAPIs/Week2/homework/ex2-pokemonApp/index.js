'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('Error: ' + response.status);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function fetchAndPopulatePokemons(results) {
  const selectElement = document.getElementById('pokemon-select');

  results.forEach((result) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = result.name;
    optionElement.value = result.url;
    selectElement.appendChild(optionElement);
  });
}

async function fetchImage(url) {
  try {
    const data = await fetchData(url);
    const pokemonUrl = data.sprites.front_default;
    const imageElement = document.getElementById('pokemon-image');
    imageElement.src = pokemonUrl;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const titleElement = document.createElement('h1');
  titleElement.textContent = 'Pokemon App';
  document.body.appendChild(titleElement);
  const button = document.createElement('button');
  button.textContent = 'Get Pokemon!';
  document.body.appendChild(button);
  const selectContainer = document.createElement('div');
  document.body.appendChild(selectContainer);
  const selectElement = document.createElement('select');
  selectElement.id = 'pokemon-select';
  selectContainer.appendChild(selectElement);
  const imageElement = document.createElement('img');
  imageElement.id = 'pokemon-image';
  imageElement.alt = 'Pokemon Image';
  document.body.appendChild(imageElement);

  try {
    const { results } = await fetchData(url);
    button.addEventListener('click', () => {
      fetchAndPopulatePokemons(results);
      if (!imageElement.src) {
        fetchImage(results[0].url);
      }
    });
    selectElement.addEventListener('change', (event) => {
      const selectedPokemon = event.target.value;
      fetchImage(selectedPokemon);
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', main);
