
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImagem = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.form');
const input = document.querySelector('.input_seart');

const buttonPrev = document.querySelector('.bnt-prev');
const buttonNext = document.querySelector('.bnt-next');
const buttonShiny = document.querySelector('.shiny');

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //a função await faz com que o JS espere a função executar para que funcione as demais da frente. mas funciona em uma função asincrona por isso colocamos o 'async' no inico da ordem/ função
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    
    } else (APIResponse.status == 400) 
        input.value = '';
        pokemonImagem.src = 'https://i.pinimg.com/originals/a7/a8/d0/a7a8d06c754cfbbbc37e64cb118c513c.gif'

        
        alert('esse pokemon nao existe por favor digite outro')
    }
    



const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonImagem.src = 'https://i.pinimg.com/originals/0f/58/60/0f5860ab2d063aaa92d55a994d9b47e4.gif'

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    input.value = '';
    searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Nao existe'
        pokemonNumber.innerHTML = 'ERRO'
    }

}

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())

})

buttonPrev.addEventListener('click', () => {
   if (searchPokemon > 1){ 
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    
    searchPokemon += 1;
    renderPokemon(searchPokemon);

})


buttonShiny.addEventListener ('click', async () => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
    const data = await fetchPokemon(searchPokemon);
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    
   
})

