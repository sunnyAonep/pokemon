import React, { useContext, useEffect, useState } from 'react';
import { PokeContext } from '../../context/PokemonData';
import pokeball from '../../assets/imgs/pokeball.png';

const PokemonCardTitle: React.FC = () => {
  const { getRandomPokemon }: any = useContext(PokeContext) || {};
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const pokemonData = await getRandomPokemon();
      if (pokemonData && pokemonData.sprites && pokemonData.sprites.front_default) {
        setPokemonImage(pokemonData.sprites.other.dream_world.front_default);
      }
    };

    fetchRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      <img 
        src={pokeball} 
        alt="Pokeball" 
        className=' md:w-[60%] h-[50%] object-cover' 
      />
      {pokemonImage ? (
        <div className='absolute inset-0 m-auto w-32 h-30 rounded-full'>
          <img 
          src={pokemonImage} 
          alt="Random Pokémon" 
          className='h-[100%] w-[100%]'
        />
        </div>
        
      ) : (
        <p className='absolute text-white text-lg'>Loading...</p>
      )}
    </div>
  );
};

export default PokemonCardTitle;
