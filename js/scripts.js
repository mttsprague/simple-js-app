let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    return {
        add: function(pokemon) {
            if (typeof pokemon === "object") {
                let keys = Object.keys(pokemon);
                let hasName = keys.includes("name");
                let hasUrl = keys.includes("detailsUrl");
                if (hasName && hasUrl) {
                    pokemonList.push(pokemon);
                }
            }
        },

        getAll: function() {
            return pokemonList;
        },

        addListItem: function(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            
            let button = document.createElement('button');
            button.innerText = (pokemon.name);
            button.classList.add('btn');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#exampleModal');
            
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            button.addEventListener('click', function() { pokemonRepository.showDetails(pokemon) });
        },

        loadList: function() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        },

        loadDetails: function(pokemon) {
            return fetch(pokemon.detailsUrl).then(function(response) {
                return response.json();
            }).then(function(details) {
                pokemon.imageURL = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
        },

        showDetails: function (pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
                pokemonRepository.showModal(pokemon);
            });
        },
        
        showModal: function showModal(pokemon) {
            //Add modal content
            let modalTitle = document.querySelector('.modal-title');
            modalTitle.innerText = pokemon.name;
            
            let pokemonImage = document.querySelector('.pokemon-image');
            pokemonImage.src = pokemon.imageURL;
            
            let pokemonHeight = document.querySelector('.pokemon-height');
            pokemonHeight.innerText = 'Height: ' + (pokemon.height/10) + 'm';              
        },
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});