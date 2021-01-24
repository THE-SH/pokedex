const pokePromises = [...Array(150)].map(async (_, i) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const pokemons = await response.json();
    return pokemons;
});

(async () => {
    const container = document.getElementById('app');

    const pokeTitle = document.createElement('h1');
    const gridContainer = document.createElement('div');
    const loadingElement = document.createElement('div');

    pokeTitle.innerText = 'pokedex';
    gridContainer.classList.add('grid-container');
    loadingElement.classList.add('loader');

    container.appendChild(pokeTitle);
    container.appendChild(gridContainer);
    container.appendChild(loadingElement);

    const result = await Promise.all(pokePromises);
    
    for (const { sprites, id, name } of result) {
        loadingElement.remove();
        gridContainer.insertAdjacentHTML('beforeend', `
            <div class="grid-item">
                <img src="${sprites.front_default}">
                <div class="name">${id} - ${name}</div>
            </div>
        `);
    }
})();