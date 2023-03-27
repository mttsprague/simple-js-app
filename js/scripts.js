/*creating an intitial pokemon list*/
    
    let pokemonList = [
        {name:'Pikachu', height:'0.4', type:[Electric]},
        {name:'Abra', height:'0.9', type:[Psychic]},
        {name:'Charizard', height:'1.7', type:['Fire', 'Flying']}
    ];   

/*if...else statement that shows any pokemon greater than or equal to 1.2m*/

    let pokemonBig = 'wow, this pokemon is pretty big!';

    for (let i=0; i < pokemonList.length; i++) {
        if (pokemonList[i].height >= 1.2) {
            document.write(pokemonList[i].name + ' (height: ' + (pokemonList[i].height) + ')' + (pokemonBig) + ' <br>');
        } else {
            document.write(pokemonList[i].name + ' (height: ' + (pokemonList[i].height) + ')<br>');
        }
    }