let pokemonRepository = (function () {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        showModal(pokemon)
        console.log(pokemon.name)
        });
    }
    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = (pokemon.name);
        button.classList.add('pokebutton');
        listItem.appendChild(button);
        ul.appendChild(listItem);

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
          .then(function (response) {
            return response.json();
        })
          .then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        })
        .catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
          .then(function (response) {
            return response.json();
        })
          .then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
        })
          .catch(function (e) {
            console.error(e);
        });
    }

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        let titleElement = document.createElement('h1');
        titleElement.innerText = (pokemon.name);

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + (pokemon.height);

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);

        if (pokemon.imageUrl) {
        let imagePokemon = document.createElement('img');
        imagePokemon.setAttribute('src', pokemon.imageUrl);
        imagePokemon.setAttribute('height', '230');
        imagePokemon.setAttribute('width', '300' );
        imagePokemon.setAttribute('alt', "Pokemon Image");
        modal.appendChild(imagePokemon);
        }

        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        closeButtonElement.addEventListener('click', hideModal);
        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });
            modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});