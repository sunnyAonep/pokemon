import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextType {
  pokemonData: Pokemon[];
  handlePageChange: (page: number) => void;
  getPokemonData: (url: string) => Promise<any>;
}

interface PokemonDataProps {
  children: ReactNode;
}

export const PokeContext = createContext<PokemonContextType | undefined>(undefined);

const PokemonData: React.FC<PokemonDataProps> = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const getPokemons = async (offset: number) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      setPokemonData(res.data.results);
      setCount(res.data.count);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const getPokemonData = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return null; 
    }
  };

  const getRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching random Pokémon data:', error);
      return null; 
    }
  };

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * 20;
    setPagination(offset);
  };

  useEffect(() => {
    getPokemons(pagination);
  }, [pagination]);

  const share = {
    getRandomPokemon,
    pokemonData,
    handlePageChange,
    getPokemonData,
    count
  };

  return (
    <PokeContext.Provider value={share}>
      {children}
    </PokeContext.Provider>
  );
};

export default PokemonData;