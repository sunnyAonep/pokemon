import React, { useContext, useEffect, useState } from "react";
import { PokeContext } from "../../context/PokemonData";
import { getTypeColor } from "../../utils/type";

interface Props {
  url: string;
  handlePokemonClick: (data: PokemonData) => void;
}

interface PokemonData {
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

const Pokemon: React.FC<Props> = ({ url, handlePokemonClick }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const { getPokemonData } :any = useContext(PokeContext);
  
  useEffect(() => {
    const fetchData = async () => {
      if (getPokemonData) {
        const data = await getPokemonData(url);
        setPokemonData(data);
      }
    };

    fetchData();
  }, [url, getPokemonData]);

  return (
  <div 
    className='bg-[#ffb22c] rounded-lg shadow-md p-4 flex flex-col items-center w-52 max-w-xs md:max-w-sm lg:max-w-md cursor-pointer transition-transform duration-300 hover:scale-105'
    onClick={() => pokemonData && handlePokemonClick(pokemonData)}
  >
    <div className='w-full h-36 flex items-center justify-center rounded-lg mb-4'>
      {pokemonData?.sprites.other.dream_world.front_default ? (
        <img 
          src={pokemonData.sprites.other.dream_world.front_default} 
          alt={pokemonData.name} 
          className='h-full w-auto rounded-lg'
        />
      ) : (
        <div className='h-full w-full flex items-center justify-center rounded-lg'>
         {pokemonData?.sprites.front_default? <img 
          src={pokemonData?.sprites.front_default} 
          alt={pokemonData?.name} 
          className='h-full w-auto rounded-lg'
        />:
        <div className='h-full w-full flex items-center justify-center bg-gray-200 rounded-lg'>
        <span className='text-gray-500'>No Image</span>
         </div>}
        </div>
      )}
    </div>
    <h3 className='text-lg font-semibold text-center mb-2 capitalize'>{pokemonData?.name}</h3>
    <p className='text-gray-700 text-center mb-1'>Height: {pokemonData?.height}</p>
    <p className='text-gray-700 text-center mb-1'>Weight: {pokemonData?.weight}</p>
    <div className='flex flex-wrap gap-2'>
      {pokemonData?.types.map((typeInfo, index) => (
        <span 
          key={index}
          className='px-3 py-1 rounded-full text-white font-medium text-xs md:text-sm'
          style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
        >
          {typeInfo.type.name}
        </span>
      ))}
    </div>
  </div>
);

};

export default Pokemon;
