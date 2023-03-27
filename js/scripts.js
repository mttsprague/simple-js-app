/*creating an intitial pokemon list*/
    
    let pokemonList = [
        {name:'Pikachu', height: 0.4, type:['Electric']},
        {name:'Abra', height: 0.9, type:['Psychic']},
        {name:'Charizard', height: 1.7, type:['Fire', 'Flying']}
    ];   

/*if statement that shows any pokemon greater than or equal to 1.2m*/

    for (let i=0; i < pokemonList.length; i++) {
        let pokemonStats = '<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + 'm)';

        if (pokemonList[i].height >= 1.2) {
            pokemonStats += ' Wow, this is a pretty big Pokemon!'
        }

        pokemonStats += '</p>';
        document.write(pokemonStats);
    }