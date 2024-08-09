import React, { useContext, useEffect, useState } from 'react';
import { PokeContext } from '../../context/PokemonData';

const PokemonCardTitle: React.FC = () => {
  const { getRandomPokemon } : any = useContext(PokeContext) || {};
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
        const pokemonData = await getRandomPokemon();
        console.log('====================================');
        console.log(pokemonData);
        console.log('====================================');
        if (pokemonData && pokemonData.sprites && pokemonData.sprites.front_default) {
          setPokemonImage(pokemonData.sprites.front_default);
        }
    };

    fetchRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className='bg-pokeball w-[50%]'>
      {pokemonImage ? (
        <img src={pokemonImage} alt="Random Pokémon" className='h-[100%] w-[100%] object-cover rounded-lg' />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonCardTitle;
